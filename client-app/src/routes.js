import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import EditProfile from "./pages/EditProfile/EditProfile";
import WalletCard from "./pages/Wallet/Wallet";
import History from "./pages/History/History";


function useRoutes (isAuthenticated) {

  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path="/profile" exact>
          <Profile/>
        </Route>
        <Route path="/profile/edit" exact>
          <EditProfile/>
        </Route>
        <Route path="/profile/wallet" exact>
          <WalletCard/>
        </Route>
        <Route path="/profile/history" exact>
          <History/>
        </Route>
        <Redirect to="/profile"/>
      </Switch>
    )
  }


  return (
    <Switch>
      <Route path='/' exact>
        <Home/>
      </Route>
      <Route path="/login" exact>
        <SignIn/>
      </Route>
      <Route path="/register" exact>
        <SignUp/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  );

}

export default useRoutes;
