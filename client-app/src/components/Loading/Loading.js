import "./Loading.css"
import React from "react"
import loadingPic from "../../img/loading.svg"


function Loading() {
  return (
      <img className="spinner" src={loadingPic} alt=""/>
  )
}

export default Loading
