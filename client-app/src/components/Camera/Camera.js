import "./Camera.css"
import React, {useRef, useState} from "react"
import backArrow from '../../img/backArrow.svg'
import nextArrow from '../../img/nextArrow.svg'
import Error from "../Error/Error"
import Loading from "../Loading/Loading"
import useUserMedia from "../../hooks/userMedia.hook"
import useFaceDet from "../../hooks/faceDet.hook"
import useUserPic from "../../hooks/userPic.hook"
import useHttp from "../../hooks/http.hook"


function Camera(props) {
  const {request} = useHttp()
  const videoTag = useRef(null)
  const canvasTag = useRef(null)
  const {mediaStream} = useUserMedia()
  const [showError, setShowError] = useState(null)
  const {createUserPic} = useUserPic()

  const {loading} = useFaceDet(videoTag)

  if (mediaStream && videoTag.current && !videoTag.current.srcObject) {
    videoTag.current.srcObject = mediaStream
  }

  const takePhotoHandler = async () => {

    if (!videoTag.current.srcObject) {
      setShowError({message: `Для продолжения нужен доступ к камере.`})
    }
    else if (videoTag.current.style.borderColor === 'red') {
      setShowError({message: 'На фото нет лица'})
    }
    else {
      // canvasTag.current.width = videoTag.current.videoWidth
      // canvasTag.current.height = videoTag.current.videoHeight
      //
      // const context = canvasTag.current.getContext('2d')
      // context.drawImage(
      //   videoTag.current,
      //   0, 0, videoTag.current.videoWidth, videoTag.current.videoHeight,
      //   0, 0, videoTag.current.videoWidth, videoTag.current.videoHeight
      // )
      //
      //
      // canvasTag.current.toBlob((blob) => {
      //   props.setUserPic(URL.createObjectURL(blob))
      // },'image/png')
      const codeFaceFormData = new FormData()

      const blobUserPic = await createUserPic(videoTag, canvasTag)
      props.setUserPic(blobUserPic)

      codeFaceFormData.append('facePic', blobUserPic, 'facPic.png')

      const userFaceCode = await request('/api/recognition', 'POST', codeFaceFormData)

      props.setFaceCode(userFaceCode.code)

      props.setShowCamera(false)
      props.setShowTotal(true)
    }
  }

  const confirmHandler = () => {
    props.setShowCamera(null)
  }

  const backButtonHandler = () => {
    props.setShowCamera(false)
  }

  const nextButtonHandler = () => {
    if (!props.userPic) {
      setShowError({message: 'Для продолжения сделайте фото Вашего лица.'})
    } else {
      props.setShowCamera(false)
      props.setShowTotal(true)
    }
  }

  const onCanPlayHandler = () => {
    videoTag.current.play()
  }

  if (loading) {
    return <Loading/>
  }

  if (showError) {
    return <Error message={showError.message} onClick={confirmHandler}/>
  }

  return (
    <div className="camera">
      <video ref={videoTag} className="card" autoPlay muted playsInline onCanPlay={onCanPlayHandler}/>
      <canvas ref={canvasTag} style={{display:"none"}}/>
      <div className="cameraControlCard card">
        <button className="navigationButton backButton" onClick={backButtonHandler}>
          <img src={backArrow} alt=""/>
        </button>
        <button className="takePhotoButton" onClick={takePhotoHandler}/>
        <button className="navigationButton nextButton" onClick={nextButtonHandler}>
          <img src={nextArrow} alt=""/>
        </button>
      </div>
    </div>
  )
}

export default Camera
