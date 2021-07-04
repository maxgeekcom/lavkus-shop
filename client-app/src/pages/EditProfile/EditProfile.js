import "./EditProfile.css"
import React, {useState, useContext, useEffect} from "react"
import useHttp from "../../hooks/http.hook"
import AuthContext from "../../context/AuthContext"
import CloseButton from "../../components/BackButton/CloseButton"
import Notification from "../../components/Notification/Notification"
import Error from "../../components/Error/Error"
import Camera from "../../components/Camera/Camera"
import TotalCard from "../../components/TotalCard/TotalCard"
import cameraPic from '../../img/camera.svg'


function EditUserPicCard(props) {
  const {request} = useHttp()
  const {token} = useContext(AuthContext)

  useEffect(() => {

    const getUserPic = async () => {
      const data = await request('/api/user/image', 'GET', null, {
        Authorization: `Bearer ${token}`
      })

      props.setUserPic(URL.createObjectURL(data))
    }
    getUserPic()
  }, [])

  const cameraButtonHandler = () => {
    props.setShowCamera(true)
  }

  return (
    <div className="editUserPicCardAnimation">
      <div className="editUserPicCard card">
        <img className="userPic" src={props.userPic} alt=""/>
        <button className="editUserPicButton" onClick={cameraButtonHandler}>
          <img src={cameraPic} alt=""/>
        </button>
      </div>
    </div>
  )
}


function EditPersonalDataCard(props) {

  const {request, error, clearError} = useHttp()
  const {token} = useContext(AuthContext)


  useEffect( () => {
    const getUserProfileData = async () => {
      const userProfileData = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })

      props.setUserNameForm({...props.userNameForm,
        lastName: userProfileData.last_name,
        firstName: userProfileData.first_name})
    }
    getUserProfileData()
  }, [])

  const onChangeHandler = (event) => {
    props.setUserNameForm({...props.userNameForm, [event.target.name]: event.target.value})
  }

  const changeDataHandler = async () => {
    try {
      const data = await request('/api/edit/personal', 'POST', {...props.userNameForm}, {
        Authorization: `Bearer ${token}`
      })
      props.setResponse(data)

    } catch (e) {}
  }

  useEffect(() => {
    props.setError(error)
    clearError()
  }, [error])


  return (
    <div className="personalDataCard card">
      <div className="subheader">
        Личные данные
      </div>

      <div className="groupLabelInput" id="editProfileLastName">
        <label className="label" htmlFor="editProfileLastNameField">Фамилия</label>
        <input
          id="editProfileLastNameField"
          type="text"
          name="lastName"
          value={props.userNameForm.lastName}
          onChange={onChangeHandler}
        />
      </div>

      <div className="groupLabelInput" id="editProfileFirstName">
        <label className="label" htmlFor="editProfileFirstNameField">Имя</label>
        <input
          id="editProfileFirstNameField"
          type="text"
          name="firstName"
          value={props.userNameForm.firstName}
          onChange={onChangeHandler}
        />
      </div>

      <button className="changePersonalDataButton" onClick={changeDataHandler}>Изменить</button>
    </div>
  )

}


function EditPasswordCard(props) {

  const {request, error, clearError} = useHttp()
  const auth = useContext(AuthContext)


  const onChangeHandler = (event) => {
    props.setPasswordForm({...props.passwordForm, [event.target.name]: event.target.value})
  }

  const changeDataHandler = async () => {
    try {
      const data = await request('/api/edit/password', 'POST', {...props.passwordForm}, {
        Authorization: `Bearer ${auth.token}`
      })
      props.setResponse(data)
    } catch (e) {}
  }

  useEffect(() => {
    props.setError(error)
    clearError()
  }, [error])

  return (
    <div className="editPasswordCard card">
      <div className="subheader">Пароль</div>

      <div className="groupLabelInput" id="editProfileOldPassword">
        <label className="label" htmlFor="editProfileOldPasswordField">
          Старый пароль
        </label>
        <input
          className="editProfileOldPasswordField"
          type="password"
          name="oldPassword"
          value={props.passwordForm.oldPassword}
          onChange={onChangeHandler}
        />
      </div>

      <div className="groupLabelInput" id="editProfileNewPassword">
        <label className="label" htmlFor="editProfileNewPasswordField">
          Новый пароль
        </label>
        <input
          className="editProfileNewPasswordField"
          type="password"
          name="newPassword"
          value={props.passwordForm.newPassword}
          onChange={onChangeHandler}
        />
      </div>

      <button className="changePasswordButton" onClick={changeDataHandler}>Изменить</button>
    </div>
  )
}


function EditProfile() {

  const {request} = useHttp()
  const {token} = useContext(AuthContext)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [showTotal, setShowTotal] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [userPic, setUserPic] = useState(null)
  const [newUserPic, setNewUserPic] = useState(null)
  const [userNameForm, setUserNameForm] = useState({
    lastName: '',
    firstName: ''
  })
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: ''
  })

  const notificationHandler = () => {
    setResponse(null)
  }

  const errorHandler = () => {
    setError(null)
  }

  const confirmNewUserPicButton = async () => {
    try {
      const blobUserPic = await fetch(newUserPic).then(r => r.blob())
      const userPicFormData = new FormData()

      userPicFormData.append('userPic', blobUserPic, 'avatar.png')
      await request('/api/edit/image', 'POST', userPicFormData, {
        Authorization: `Bearer ${token}`
      })

      setUserPic(newUserPic)
      setShowTotal(false)
    } catch (e) {}
  }

  if (error) {
    return <Error message={error} onClick={errorHandler}/>
  }

  if (response) {
    return <Notification message={response.message} onClick={notificationHandler}/>
  }

  if (showCamera) {
    return <Camera
      setShowCamera={setShowCamera}
      setUserPic={setNewUserPic}
      setShowTotal={setShowTotal}
    />
  }

  if (showTotal) {
    return <TotalCard
      userPic={newUserPic}
      setShowCamera={setShowCamera}
      setShowTotal={setShowTotal}
      confirmHandler={confirmNewUserPicButton}
    />
  }

  return (
    <div className="editProfile">
      <EditUserPicCard
        setShowCamera={setShowCamera}
        setUserPic={setUserPic}
        userPic={userPic}
      />
      <EditPersonalDataCard
        userNameForm={userNameForm}
        setUserNameForm={setUserNameForm}
        setResponse={setResponse}
        setError={setError}
      />
      <EditPasswordCard
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        setResponse={setResponse}
        setError={setError}/>
      <CloseButton/>
    </div>
  )
}

export default EditProfile
