const config = require('config')
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {check, validationResult} = require("express-validator")
const hash = require('object-hash')
const multer = require('multer')
const router = Router()


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/users')
  },
  filename: (req, file, cb) => {
    const filename = hash(req.body)
    cb(null, filename + '.' +  file.mimetype.split('/')[1])
  }
})


router.post(
  '/register',
  [
    multer({storage: storage}).single('userPic'),

    check(['lastName', 'firstName', 'login', 'password', 'repeatPassword'])
      .isLength({min: 1}).withMessage("Все поля должны быть заполнены."),

    check('login')
      .custom(value => !/\s/.test(value)).withMessage('Такой логин не подойдет. Пожалуйста, исользуйте латиницу и цифры.').bail()
      .isAscii().withMessage('Такой логин не подойдет. Пожалуйста, исользуйте латиницу и цифры.'),

    check(['password', 'repeatPassword'])
      .isLength({min: 8}).withMessage('Пароль слишком короткий. Используйте хотя бы 8 символов.').bail()
      .isAscii().withMessage('Пароль должен содержать латиницу и спецсимволы.'),
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.errors[0].msg})
      }

      const {lastName, firstName, login, password, repeatPassword, faceCode} = req.body
      const userPic = req.file
      const [candidate] = await User.find(login)

      if (password !== repeatPassword) {
        return res.status(400).json({message: "Пароли не совпадают!"})
      }

      if (candidate) {
        return res.status(400).json({message: "Такой пользователь уже существует!"})
      }

      if (!userPic) {
        return res.status(200).json({message: "Валидация формы регистрации прошла успешно!"})
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User(
        lastName,
        firstName,
        login,
        hashedPassword,
        userPic.filename.split('.')[0],
        '{' + faceCode.slice(1, faceCode.length - 1) + '}'
        )

      await user.create()

      const userID = await User.find(login).then(user => user[0].id)

      const token = jwt.sign(
        {userID: userID},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({token, userID: userID})

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте еще раз.' })
    }
})


router.post(
  '/login',
  [
    check(['login', 'password'])
    .isLength({min: 1}).withMessage('Все поля должны быть заполнены.'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.errors[0].msg})
      }

      const {login, password} = req.body
      const [user] = await User.find(login)


      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден!' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
      }

      const token = jwt.sign(
        {userID: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({token, userID: user.id})

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте еще раз.' })
    }
})

module.exports = router
