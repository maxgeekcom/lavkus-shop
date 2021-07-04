import React, {useEffect, useState} from "react"
import * as faceapi from "face-api.js"


const IS_FACE = '10px solid #00EA41'
const NOT_FACE = '10px solid red'


function useFaceDet(srcMedia) {

  const [loading, setLoading] = useState(false)

  const loadFaceDetectionNet = async () => {
    setLoading(true)
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models')

      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFaceDetectionNet()

    const intervalID = setInterval(async () => {
      try {
        if (srcMedia.current) {
          const detection = await faceapi.detectSingleFace(srcMedia.current, new faceapi.TinyFaceDetectorOptions())

          if (detection) {
            srcMedia.current.style.border = IS_FACE
          } else {
            srcMedia.current.style.border = NOT_FACE
          }
        }
      } catch (e) {}
    }, 60)


    return function cleanup() {
      clearInterval(intervalID)
    }
  }, [])

  return {loading}
}

export default useFaceDet
