import "./TotalCard.css"
import React from "react"


function TotalCard(props) {

  const backButtonHandler = async () => {
    props.setShowCamera(true)
    props.setShowTotal(false)
  }

  return (
    <div className="total">
      <div className="card totalCard">
        <img className="userPic totalUserPic" src={URL.createObjectURL(props.userPic)} alt=""/>
        <div className="totalUserName">
          {props.userName}
        </div>

        <div className="totalCardNavigation">
          <button className="totalCardBackButton" onClick={backButtonHandler}>Назад</button>
          <button className="totalCardConfirmButton" onClick={props.confirmHandler}>ОК</button>
        </div>
      </div>
    </div>
  )
}

export default TotalCard
