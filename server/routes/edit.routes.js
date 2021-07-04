const {Router} = require("express")
const auth = require("../middleware/auth.middleware")
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = Router()
const hash = require('object-hash')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const filename = hash(req.user)
    cb(null, filename + '.' +  file.mimetype.split('/')[1])
  }
})


router.post(
  '/image', // /api/edit/image
  [
    auth,
    multer({storage: storage}).single('userPic'),
  ],
  async (req, res) => {
    try {
      const userID = req.user.userID
      const userPic = req.file.filename.split('.')[0]

      User.updateUserPic(userID, userPic)

      res.status(200).json({message: 'Пользовательское фото успешно обновлено.'})
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так. Попробуйте еще раз." })
    }
  }
)


router.post(
  '/personal', // /api/edit/personal
  [
    auth,
    check(['lastName', 'firstName'])
      .isLength({min: 1}).withMessage('Поля фамилия и имя должны быть заполнены.')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!validationResult(req).isEmpty()) {
        // Из всего массива передавать только первую ошибку
        return res.status(400).json({message: errors.errors[0].msg})
      }

      const {lastName, firstName} = req.body
      const userID = req.user.userID

      User.updatePersonalInfo(userID, lastName, firstName)

      res.status(202).json({ message: 'Фамилия и имя успешно обновлены!' })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте еще раз.' })
    }
  }
)

router.post(
  '/password',
  [
    auth,
    check(['oldPassword', 'newPassword'])
      .isLength({min: 1}).withMessage('Поля старый пароль и новый пароль должны быть заполнены.').bail()
      .isAscii().withMessage('Пароль должен содержать символы английского алафавита и спецсимволы.'),
    check('newPassword')
      .isLength({min: 8}).withMessage('Длина нового пароля меньше 8 символов.').bail()
      .isAscii().withMessage('Пароль должен содержать символы английского алафавита и спецсимволы.'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        // Из всего массива передавать только первую ошибку
        return res.status(400).json({message: errors.errors[0].msg})
      }

      const {oldPassword, newPassword} = req.body
      const userID = req.user.userID
      const [currentPassword] = await User.getPassword(userID)
      const isPasswordsMatch = await bcrypt.compare(oldPassword, currentPassword.password)

      if (!isPasswordsMatch) {
        return res.status(400).json({message: "Старый пароль указан неверно!"})
      }

      if (oldPassword === newPassword) {
        return res.status(400).json({message: 'Старый и новый пароли не должны совпадать!'})
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12)

      User.updatePassword(userID, hashedPassword)

      res.status(200).json({message: "Пароль успешно обновлен!"})

    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так. Попробуйте еще раз." })
    }
  }
)

module.exports = router
