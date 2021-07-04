import "./SignUp.css"
import React, {useState, useContext} from "react"
import useHttp from "../../hooks/http.hook"
import AuthContext from "../../context/AuthContext"
import Error from "../../components/Error/Error"
import SignUpCard from "../../components/SignUpCard/SignUpCard"
import Camera from "../../components/Camera/Camera"
import TotalCard from "../../components/TotalCard/TotalCard"


function SignUp() {
  const auth = useContext(AuthContext)
  const {request, error, clearError} = useHttp()
  const [showCamera, setShowCamera] = useState(false)
  const [showTotal, setShowTotal] = useState(false)
  const [userPic, setUserPic] = useState(null)
  const [faceCode, setFaceCode] = useState(null)
  const [signUpForm, setSignUpForm] = useState({
    lastName: "",
    firstName: "",
    login: "",
    password: "",
    repeatPassword: ""
  })


  const errorHandler = () => {
    clearError()
  }

  const nextButtonHandler = async () => {
    try {
      const data = await request('/api/register', 'POST', {
        ...signUpForm,
        ['login']: signUpForm.login.toLowerCase()
      })
      setShowCamera(!!data)
    } catch (e) {}
  }

  const registerHandler = async () => {
    try {
      const userFormData = new FormData()

      userFormData.append(
        'lastName',
        signUpForm.lastName.slice(0, 1).toUpperCase() + signUpForm.lastName.slice(1).toLowerCase())
      userFormData.append(
        'firstName',
        signUpForm.firstName.slice(0, 1).toUpperCase() + signUpForm.firstName.slice(1).toLowerCase())
      userFormData.append('login', signUpForm.login.toLowerCase())
      userFormData.append('password', signUpForm.password)
      userFormData.append('repeatPassword', signUpForm.repeatPassword)
      userFormData.append('userPic', userPic, 'avatar.png')
      userFormData.append('faceCode', faceCode)

      const data = await request('/api/register', 'POST', userFormData)
      auth.login(data.token, data.userID)
    } catch (e) {}
  }

  if (error) {
    return (
      <Error message={error} onClick={errorHandler}/>
    )
  }

  if (showCamera) {
    return <Camera
      userPic={userPic}
      setUserPic={setUserPic}
      setFaceCode={setFaceCode}
      setShowCamera={setShowCamera}
      setShowTotal={setShowTotal}
    />
  }

  if (showTotal) {
    const userName = signUpForm.lastName + " " + signUpForm.firstName
    return <TotalCard
      setShowCamera={setShowCamera}
      setShowTotal={setShowTotal}
      userPic={userPic}
      userName={userName}
      confirmHandler={registerHandler}
    />
  }

  return (
    <div className="signUp">
      <SignUpCard
        signUpForm={signUpForm}
        setSignUpForm={setSignUpForm}
        nextButtonHandler={nextButtonHandler}
      />
    </div>
  )
}

export default SignUp
