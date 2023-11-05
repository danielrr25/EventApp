import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import Link
import './Login.css'; // Import your CSS file
import standard_logo from './PopOutGradient.png';

function Login() {

  var loginName;
  var loginPassword;

  const [message, setMessage] = useState('');
  const history = useHistory();

  const doLogin = async (event) => 
  {
    event.preventDefault();
    
    var obj = {username:loginName.value,password:loginPassword.value};
    var js = JSON.stringify(obj);

    try
    {
      const response = await fetch('http://167.172.230.181:5000/users/login',
        {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      // verify login information from user
      if(res.success){
        setMessage('Login successful');
        history.push('/event'); //go to event page after successful login
      } else {
        setMessage('Incorrect username or password')
      }
      
    }
    catch(e)
    {
      alert(e.toString());
      return;
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={doLogin}>
        <h2 className="login-title">WELCOME TO</h2>
        <img src={standard_logo} alt="Your Logo" className="standard_logo" />
        <input
          type="text"
          id="loginName"
          className="rounded-input"
          placeholder="Enter email"
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

        {/* Redirect to register page here */}
        <Link to="/register">
          <button className="reg-button">
            <span className="new-user">New User?</span>
            <span className="space">o</span>
            <span className="sign-up-here">Sign Up Here</span>
          </button>
        </Link>

      </form>
      <span className="login-result">{message}</span>
    </div>
  );
}

export default Login;
