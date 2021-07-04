const path = require('path')
const fs = require('fs')
const tfjs = require('@tensorflow/tfjs-node')
const faceapi = require('face-api.js')
const {Router} = require('express')

const multer = require('multer')

const router = Router()
const canvas = require('canvas')
const {Canvas, Image, ImageData} = canvas

const PATH_TO_IMAGES_CATALOGUE = path.resolve(__dirname, '../images/tempRecogFaces')

faceapi.env.monkeyPatch({Canvas, Image, ImageData})

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromDisk('modelsNets'),
  faceapi.nets.faceLandmark68Net.loadFromDisk('modelsNets'),
  faceapi.nets.ssdMobilenetv1.loadFromDisk('modelsNets'),
]).then()


function getRandomID() {
   return Math.floor(Math.random() * 1000000000)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/tempRecogFaces')
  },
  filename: (req, file, cb) => {
    const filename = String(getRandomID())
    cb(null, filename + '.' +  file.mimetype.split('/')[1])
  }
})


router.post(
  '/',
  [
    multer({storage: storage}).single('facePic')
  ],
  async (req, res) => {
    try{
      const filename = req.file.filename
      const pathToImage =  path.resolve(PATH_TO_IMAGES_CATALOGUE, filename)

      const facePic = await canvas.loadImage(pathToImage)
      const facesCodes = await faceapi.detectAllFaces(facePic).withFaceLandmarks().withFaceDescriptors()

      // delete image
      fs.unlink(pathToImage, (err) => {
        if (err) throw err
      })

      if (facesCodes.length > 1 || facesCodes.length === 0) {
        return res.status(400).json({code: null})
      }

      const faceCode = facesCodes[0].descriptor.join(', ') // array to string

      res.status(200).json({code: faceCode})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так. Поробуйте еще раз.'})
    }
  }
)

module.exports = router
