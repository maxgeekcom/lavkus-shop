import "./Mirror.css"
import React from "react"
import useUserMedia from "../../hooks/userMedia.hook"


function Mirror(props) {
  const {mediaStream} = useUserMedia()

  if (mediaStream && props.videoTag.current && !props.videoTag.current.srcObject) {
    props.videoTag.current.srcObject = mediaStream
  }

  const onCanPlayHandler = () => {
    props.videoTag.current.play()
  }

  return (
    <video ref={props.videoTag} className="mirror" autoPlay muted playsInline onCanPlay={onCanPlayHandler}/>
  )
}

export default Mirror
