import "./Notification.css"
import React from "react"

function Notification(props) {
  return (
    <div className="notification">
      <div className="card notificationCard">
        <div className="header notificationHeader">Уведомление</div>
        <div className="notificationMessage">
          {props.message}
        </div>
        <button className="confirmButton" onClick={props.onClick}>ОК</button>
      </div>
    </div>
  )
}

export default Notification
