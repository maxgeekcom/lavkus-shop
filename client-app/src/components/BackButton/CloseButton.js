import "./CloseButton.css"
import React from "react"
import {NavLink} from "react-router-dom"
import crossPic from "../../img/cross.svg"


function CloseButton() {
  return(
    <NavLink className="card closeButton" to="/profile">
      <img src={crossPic} alt="cross"/>
    </NavLink>
  );
}

export default CloseButton;
