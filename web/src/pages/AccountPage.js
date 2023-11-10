import React from 'react';
import DeleteAccount from '../components/DeleteAccount.js';
import DisplayUser from '../components/DisplayUserInfo.js';
import Logout from '../components/Logout.js';
import LogoGradient from './PopOut.png';
import './AccountPage.css';


function AccountPage({setUserID}) {
  return (
    <div className="account-page-container">
      <div className="header-container2"></div>
      <div className="logo-container">
          <img src={LogoGradient} alt="Your Logo" className="logogradient" />
        </div>
      <div className="title2">
          <h1>Your Account</h1>
        </div> 
      <DisplayUser setUserID={setUserID}/>
      <DeleteAccount setUserID={setUserID}/>
      <Logout setUserID={setUserID}/>
    </div>
  );
}

export default AccountPage;