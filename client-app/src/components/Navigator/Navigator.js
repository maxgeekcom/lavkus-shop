import "./Navigator.css"
import React from "react"
import {NavLink} from "react-router-dom"
import shopPic from "../../img/shop-pic.svg"
import loginPic from "../../img/login-pic.svg"


function Navigator() {
  return (
    <nav className="navigator">
      <div className="spacer"/>
      <NavLink to='/' className="logo">
        <div className="logo">
          <img className="shop-pic" src={shopPic} alt="shop-pic"/>
          <div className="shop-name">
            Лавкус
          </div>
        </div>
      </NavLink>
      <NavLink className="loginButton" to="/login">
        <img src={loginPic} alt="loginButtonImg"/>
      </NavLink>
    </nav>
  )
}

export default Navigator