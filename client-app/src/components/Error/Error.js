import "./Error.css"
import React from "react"


function Error(props) {
  return (
    <div className="error">
      <div className="errorCard card">
        <div className="header" id="errorHeader">Ошибка</div>
        <div className="errorMessage">
          {props.message}
        </div>
        <button className="confirmButton" onClick={props.onClick}>ОК</button>
      </div>
    </div>
  )
}

export default Error
