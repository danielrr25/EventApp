import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import standard_logo from './PopOutGradient.png';
import { useUser } from './UserContext';
import EmailPopup from './EmailPopup';
import CodePopup from './CodePopup';
import ChangePasswordPopup from './ChangePasswordPopup';

function Login() {
  const [overlayActive, setOverlayActive] = useState(false);
  var loginName;
  var loginPassword;

  const [username, setUsername] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showEnterCode, setShowEnterCode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { setUserID } = useUser();

  const [message, setMessage]  = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [codeMessage, setCodeMessage] = useState('');
  const [changePasswordMessage, setChangePasswordMessage] = useState('');

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setOverlayActive(true);
  };

  const handleEnterEmail = async () => {
    try {
      const response = await fetch('http://167.172.230.181:5000/users/resetpassword', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setShowEnterCode(true);
        setEmailMessage('Check email for code');
      } else {
        setEmailMessage('Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEnterCode = async () => {
    try {
      const response = await fetch('http://167.172.230.181:5000/users/resetpasswordentercode', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setShowChangePassword(true);
      } else if (response.status === 404) {
        setCodeMessage('Invalid code');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://167.172.230.181:5000/users/changepassword', {
        method: 'POST',
        body: JSON.stringify({ username, newpassword: newPassword, confirmpassword: confirmPassword }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setChangePasswordMessage('Password changed');
        setShowForgotPassword(false);
        setShowEnterCode(false);
        setShowChangePassword(false);
        setOverlayActive(false);
      } else if (response.status === 400)  {
        setChangePasswordMessage('Passwords do not match');
      } else if (response.status === 404)  {
        setChangePasswordMessage('User not found');
      } else if (response.status === 408)  {
        setChangePasswordMessage('Cannot use an old password');
      } else {
        setChangePasswordMessage('Error changing password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

const doLogin = async (event) => {
  event.preventDefault();

  var obj = { username: loginName.value, password: loginPassword.value };
  var js = JSON.stringify(obj);

  try {
    const response = await fetch('http://167.172.230.181:5000/users/login', {
      method: 'POST',
      body: js,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      const data = await response.json();

      // Set the userID and token as cookies
      document.cookie = `userID=${data.userID}; path=/`;
      document.cookie = `token=${data.token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 1000).toUTCString()}`; // Expires in 1 hour

      setUserID(data.userID);
      setMessage('Login successful');
      navigate('/event');
    } else if (response.status === 400) {
      setMessage('Invalid login credentials');
    } else if (response.status === 500) {
      setMessage('An error has occurred.');
    } else {
      setMessage('Unknown error');
    }
  } catch (e) {
    alert(e.toString());
    return;
  }
};


  return (
    <div className="login-container">
      <div className={`overlay ${overlayActive ? 'active' : ''}`}></div>
      <form onSubmit={doLogin}>
        <h2 className="login-title3">WELCOME TO</h2>
        <img src={standard_logo} alt="Your Logo" className="standard_logo-login" />
        <input
          type="text"
          id="loginName"
          className="rounded-input"
          placeholder="Enter username"
          ref={(c) => (loginName = c)}
        />
        <input
          type="password"
          id="loginPassword"
          className="rounded-input"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />
        <button type="submit" className="login-button">
          Enter
        </button>

        <button type="button" className="forgot-password-button" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </form>

      {showForgotPassword && (
        <EmailPopup
          title="Enter Email"
          onSubmit={handleEnterEmail}
          email={email}
          setEmail={setEmail}
          message={emailMessage}
          setMessage={setEmailMessage}
        />
      )}

      {showEnterCode && (
        <CodePopup title="Enter Code" onSubmit={handleEnterCode} code={code} setCode={setCode} message={codeMessage} />
      )}

      {showChangePassword && (
        <ChangePasswordPopup
          title="Change Password"
          onSubmit={handleChangePassword}
          username={username}
          setUsername={setUsername}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          message={changePasswordMessage}
        />
      )}

      <Link to="/register">
        <button className="reg-button">
          <span className="new-user">New User?</span>
          <span className="space">o</span>
          <span className="sign-up-here">Sign Up Here</span>
        </button>
      </Link>

      <span className="login-result">{message}</span>
    </div>
  );
}

export default Login;
