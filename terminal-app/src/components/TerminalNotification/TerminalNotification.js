import "./TerminalNotification.css"
import React from "react"


function MessageContent(props) {
  return (
    <div className="messageContentContainer">
      {props.text}
    </div>
  )
}

function DialogContent(props) {
  const clearNotification = () => {
    props.setNotification({message: {text: 'Отсканируйте товар'}})
  }

  const confirmHandler = () => {
    props.setItemsInfo(oldItemsList => oldItemsList.map((oldItem) => {
      if (oldItem.id === props.extraItem.id) {
        return {...oldItem, number: oldItem.number + 1}
      }
      return oldItem
    }))
    props.setTotalPrice(prevTotalPrice => prevTotalPrice + props.extraItem.price)
    clearNotification()
  }

  const rejectHandler = () => {
    clearNotification()
  }

  return (
    <div className="dialogContentContainer">
      <div className="dialogMessage">
        Добавить еще {props.extraItem.name}?
      </div>
      <div className="dialogController">
        <button className="confirmDialogButton" onClick={confirmHandler}>Да</button>
        <button className="rejectDialogButton" onClick={rejectHandler}>Нет</button>
      </div>
    </div>
  )
}

function TerminalNotification(props) {
  return (
    <div className="card terminalNotificationCard">
      {props.notification.message
      && <MessageContent
        text={props.notification.message.text}
      />}

      {props.notification.dialog
      && <DialogContent
        extraItem={props.notification.dialog.item}
        itemsInfo={props.itemsInfo}
        setItemsInfo={props.setItemsInfo}
        setTotalPrice={props.setTotalPrice}
        setNotification={props.setNotification}
      />}
    </div>
  )
}

export default TerminalNotification
