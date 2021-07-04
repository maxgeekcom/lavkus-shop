import React, {useState} from "react"
import * as faceapi from "face-api.js"


function useFaceDet() {
  const [loading, setLoading] = useState(false)

  const loadFaceRecognitionNet = async () => {
    setLoading(true)
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models')

      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const faceDetection = async (srcMedia) => {
    const facesMetrics = await faceapi.detectAllFaces(srcMedia.current, new faceapi.TinyFaceDetectorOptions())

    if (facesMetrics.length === 1) {
      return true
    } else if (facesMetrics.length > 2) {
      return {type: 'message', text: 'Для оплаты должно быть одно лицо в терминале!'}
    } else {
      return false
    }
  }

  return {faceDetection, loadFaceRecognitionNet, loading}
}

export default useFaceDet
