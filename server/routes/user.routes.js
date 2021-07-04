const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const path = require('path')
const router = Router()
const serverCatalog = path.resolve()


router.get(
  '/', // /api/user
  [
    auth
  ],
  async (req, res) => {
    try {
      const userID = req.user.userID
      const [userProfileData] = await User.getProfile(userID)

      res.json(userProfileData)

    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
    }
})


router.get(
  '/wallet', // /api/user/wallet
  auth,
  async (req, res) => {
    try {
      const userID = req.user.userID
      const [balance] = await User.getBalance(userID)

      res.json(balance)

    } catch (e) {
      res.status(500).json({status: "error", message: "Что-то пошло не так, попробуйте снова."})
    }
  }
)


router.post('/wallet', // /api/user/wallet
  auth,
  async (req, res) => {
    try {

      const userID = req.user.userID
      const newBalance = req.body.newBalance

      User.updateBalance(userID, newBalance)

      res.status(202).json({status: "success", message: "Баланс успешно пополнен!"})
    } catch (e) {
      res.status(500).json({status: "error", message: "Что-то пошло не так, попробуйте снова."})
    }
  }
)


router.get('/image', // /api/user/image
  [
    auth
  ],
  async (req, res) => {
    try {
      const userID = req.user.userID
      const [image] = await User.getUserPic(userID)
      const imgPath = path.resolve(serverCatalog, 'images/users', image.user_pic + '.png')

      res.sendFile(imgPath)
    } catch (e) {
      res.status(500).json({status: "error", message: "Что-то пошло не так, попробуйте снова."})
    }
  }
)


router.get(
  '/history', // /api/user/history
  [
    auth
  ],
  async (req, res) => {

  }
)

module.exports = router
