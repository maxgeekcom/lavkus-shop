import "./Profile.css";
import React, {useContext, useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";
import Loading from "../../components/Loading/Loading";


function UserPicCard(props) {

  return (
    <div className="userPicCard card">
      <img className="userPic" src={props.userPic} alt=''/>
    </div>
  );

}


function UserNameCard(props) {

  return (
    <NavLink className="userNameCard card" to="/profile/edit">
      <div className="labelUserNameCard label">Профиль</div>
      <div className="userName">{props.userName}</div>
    </NavLink>
  );

}


function BalanceCard(props) {

  return (
    <NavLink className="balanceCard card" to="/profile/wallet">
      <div className="labelBalanceCard label">Баланс</div>
      <div className="balance">{props.balance + " ₽"}</div>
    </NavLink>
  );

}


function LastPurchase(props) {

  return (
    <NavLink className="lastPurchaseCard card" to="/profile/history">
      <div className="lastPurchaseLabel label">История</div>
      <div className="lastPurchase">{props.lastPurchase}</div>
    </NavLink>
  );

}


function ExitCard() {

  const auth = useContext(AuthContext);

  const exitHandler = () => {
    try {
      auth.logout()
    } catch (e) {}
  };

  return (
    <NavLink className="exitCard card" onClick={exitHandler} to="/">
      <div className="exit">Выход</div>
    </NavLink>
  );

}


function Profile() {

  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [userPic, setUserPic] = useState(null);
  const [userName, setUserName] = useState('Неизвестно');
  const [balance, setBalance] = useState(0);
  const [lastPurchase, setLastPurchase] = useState('Нет покупок');


  useEffect( () => {
    const getUserProfileData = async () => {

      const userProfileData = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setUserName(userProfileData.last_name + " " + userProfileData.first_name);
      setBalance(userProfileData.balance);
    }
    getUserProfileData()
  }, []);

  useEffect(() => {
    const getUserPic = async () => {
      const data = await request('/api/user/image', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setUserPic(URL.createObjectURL(data));
    }
    getUserPic()
  }, []);

  if (loading) {
    return <Loading/>
  }


  return (
    <div className="profile">
      <UserPicCard
        userPic={userPic}
      />
      <UserNameCard userName={userName} />
      <BalanceCard balance={balance}/>
      <LastPurchase lastPurchase={lastPurchase}/>
      <ExitCard/>
    </div>
  );

}

export default Profile;
