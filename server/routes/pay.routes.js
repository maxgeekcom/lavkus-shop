const faceapi = require('face-api.js')
const {Router} = require('express')
const User = require('../models/User')
const Transaction = require('../models/Transaction')

const router = Router()
const multer = require("multer")()

const faceMatch = (faceCode, users, distanceThreshold) => {

  let distance = faceapi.euclideanDistance(faceCode, users[0].face_code)
  let user = users[0]

  for (let i = 1; i < users.length; i++) {
    const candidateDistance = faceapi.euclideanDistance(faceCode, users[i].face_code)

    if (candidateDistance < distance) {
      distance = candidateDistance
      user = users[i]
    }
  }

  // const candidate = users.reduce((previousValue, user, index) => {
  //   const distance = faceapi.euclideanDistance(faceCode, user.face_code)
  //   if (distance < distanceThreshold) {
  //     previousValue.userIndex = index
  //     previousValue.distance = distance
  //   }
  // }, {userIndex: 0, distance: 1})


  if (distance > distanceThreshold) {
    return null
  }

  return user
}

router.post(
  '/', // /api/pay
  [
    multer.none()
  ],
  async (req, res) => {
    try {
      const paymentData = req.body
      const faceCode = JSON.parse('[' + paymentData.faceCode + ']')
      const itemsInfo = JSON.parse(req.body.itemsInfo)
      const users = await User.getCandidates()
      const user = faceMatch(faceCode, users, 0.6)

      if (!user) {
        return res.status(200).json({status: 'failure', type: 'face' , message: 'Такого пользователя нет.'})
      }

      const totalAmount = itemsInfo.reduce((sum, item) => sum + item.price * item.number, 0)

      if (totalAmount > user.balance) {
        return res.status(200).json({status: 'failure', type: 'balance',message: 'На балансе недостаточно средств.'})
      }

      Transaction.createTransaction(user.id, itemsInfo)
      User.updateBalance(user.id, user.balance - totalAmount)

      const userName = user.first_name  + ' ' + user.last_name.slice(0, 1) + '.'
      res.status(201).json({status: 'success', type: 'purchase',  message: `${userName}, оплата прошла успешно!`})
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте еще раз.' })
    }
  }

)

module.exports = router
