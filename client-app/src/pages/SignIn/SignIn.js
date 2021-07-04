import "./SignIn.css"
import React, {useState, useContext, useEffect} from "react"
import {NavLink} from "react-router-dom"
import useHttp from "../../hooks/http.hook"
import AuthContext from "../../context/AuthContext"
import Error from "../../components/Error/Error"


function SignInCard(props) {
  const {request, error, clearError} = useHttp()
  const auth = useContext(AuthContext)

  const changeHandler = event => {
    props.setLoginForm({...props.loginForm, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/login', 'POST', {...props.loginForm,
        login: props.loginForm.login.toLowerCase()})

      auth.login(data.token, data.userID)
    } catch (e) {}
  }

  useEffect(() => {
    props.setError(error)
    clearError()
  }, [error])

  return (
    <div className="signInCard card">
      <div className="header" id="signInHeader">
        Войти
      </div>

      <div className="groupLabelInput" id="signInLogin">
        <label className="label" htmlFor="signInLoginField">Логин</label>
        <input
          id="signInLoginField"
          type="text"
          autoCapitalize="off"
          name="login"
          value={props.loginForm.login}
          onChange={changeHandler}
        />
      </div>

      <div className="groupLabelInput" id="signInPassword">
        <label className="label" htmlFor="signInPasswordField">Пароль</label>
        <input
          id="signInPasswordField"
          type="password"
          name="password"
          value={props.loginForm.password}
          onChange={changeHandler}
        />
      </div>

      <button
        className="signInButton"
        onClick={loginHandler}
      >
        Войти
      </button>

      <div className="alternative">
        или
      </div>

      <NavLink className="btnLink" to="/register">
        Регистрация
      </NavLink>
    </div>
  )
}


function SignIn() {
  const [error, setError] = useState(null)
  const [loginForm, setLoginForm] = useState({
    login: "",
    password: ""
  })

  const handlerError = () => {
    setError(null)
  }

  if (error) {
    return <Error message={error} onClick={handlerError}/>
  }

  return (
    <div className="signIn">
      <SignInCard
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        setError={setError}
      />
    </div>
  )
}

export default SignIn
