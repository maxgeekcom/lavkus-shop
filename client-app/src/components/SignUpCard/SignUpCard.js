import "./SignUpCard.css"
import React from "react"
import {NavLink} from "react-router-dom"


function SignUpCard(props) {

  const changeHandler = event => {
    props.setSignUpForm({...props.signUpForm, [event.target.name]: event.target.value })
  }

  return (
    <div className="signUpCard card">
      <div className="header">Регистрация</div>

      <div className="groupLabelInput" id="signUpLastName">
        <label className="label" htmlFor="signUpLastNameField">Фамилия</label>
        <input id="signUpLastNameField"
               type="text"
               name="lastName"
               value={props.signUpForm.lastName}
               onChange={changeHandler}
        />
      </div>

      <div className="groupLabelInput" id="signUpFirstName">
        <label className="label" htmlFor="signUpFirstNameField">Имя</label>
        <input
          id="signUpFirstNameField"
          type="text"
          name="firstName"
          value={props.signUpForm.firstName}
          onChange={changeHandler}
        />
      </div>

      <div className="groupLabelInput" id="signUpLogin">
        <label className="label" htmlFor="signUpLoginField">Логин</label>
        <input
          id="signUpLoginField"
          type="text"
          name="login"
          value={props.signUpForm.login}
          onChange={changeHandler}
          autoCapitalize="off"
        />
      </div>

      <div className="groupLabelInput" id="signUpPassword">
        <label className="label" htmlFor="signUpPasswordField">Пароль</label>
        <input
          id="signUpPasswordField"
          type="password"
          name="password"
          value={props.signUpForm.password}
          onChange={changeHandler}
        />
      </div>

      <div className="groupLabelInput" id="signUpRepeatPassword">
        <label className="label" htmlFor="signUpRepeatPasswordField">Повторите пароль</label>
        <input
          id="signUpRepeatPasswordField"
          type="password"
          name="repeatPassword"
          value={props.signUpForm.repeatPassword}
          onChange={changeHandler}
        />
      </div>

      <button id="singUpNextButton" onClick={props.nextButtonHandler}>
        Далее
      </button>

      <div className="alternative">
        или
      </div>

      <NavLink className="btnLink" to="/login">
        Войти
      </NavLink>
    </div>
  )
}

export default SignUpCard
