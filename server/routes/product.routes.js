const {Router} = require('express')
const Product = require('../models/Product')

const router = Router()


router.post(
  '/', // /api/product
  [],
  async (req, res) => {
    try {
      const productID = req.body.id
      const [productInfo] = await Product.getProductInfo(productID)

      if (!productInfo) {
        return res.status(400).json({ message: 'Такого товара нет.' })
      }

      res.status(200).json({ productInfo: productInfo })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте еще раз.' })
    }
  }
)

module.exports = router
