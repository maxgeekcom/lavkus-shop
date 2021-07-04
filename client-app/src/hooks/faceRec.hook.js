// import React, {useState, useEffect} from "react"
// import * as faceapi from "face-api.js"
//
//
// const IS_FACE = '10px solid #00EA41'
// const NOT_FACE = '10px solid red'
//
//
// function useFaceDet(srcMedia) {
//
//   const [loading, setLoading] = useState(false)
//
//   const loadFaceDetectionNet = async () => {
//     setLoading(true)
//     try {
//       await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
//       await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
//       await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
//       setLoading(false)
//     } catch (e) {
//       setLoading(false)
//     }
//   }
//
//
//   useEffect(() => {
//
//     loadFaceDetectionNet()
//
//     const intervalID = setInterval(async () => {
//       try {
//         if (srcMedia.current) {
//           const detection = await faceapi.detectSingleFace(srcMedia.current)
//
//           if (detection) {
//             srcMedia.current.style.border = IS_FACE
//           } else {
//             srcMedia.current.style.border = NOT_FACE
//           }
//         }
//       } catch (e) {}
//     }, 30)
//
//
//     return function cleanup() {
//       clearInterval(intervalID)
//     }
//   }, [])
//
//
//   const faceRecognition = async (srcMedia) => {
//     setLoading(true)
//     try {
//       const faceMetrics = await faceapi.detectSingleFace(srcMedia.current).withFaceLandmarks().withFaceDescriptor()
//       setLoading(false)
//       return faceMetrics.descriptor
//     } catch (e) {
//       setLoading(false)
//     }
//   }
//
//   return {faceRecognition, loading}
// }
//
// export default useFaceDet
