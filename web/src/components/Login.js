import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Login() {

  var loginName;
  var loginPassword;

  const [message, setMessage] = useState('');

  const doLogin = async (event) => 
  {
    event.preventDefault();
    
    var obj = {login:loginName.value,password:loginPassword.value};
    var js = JSON.stringify(obj);

    try
    {
      const response = await fetch('http://localhost:5050/api/login',
        {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());
      
      if( res.id <= 0 )
      {
        setMessage('User/Password combination incorrect');
      }
      else
      {
       var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
       localStorage.setItem('user_data', JSON.stringify(user));
       setMessage('');
       window.location.href = '/EventApp';
      }
    }
    catch(e)
    {
      alert(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doLogin}>
      <span id="inner-title">LOG IN</span><br />
      <input type="text" id="loginName" placeholder="Enter email"
        ref={(c) => loginName = c}/><br />
      <input type="password" id="loginPassword" placeholder="Password"
         ref={(c) => loginPassword = c}/><br />
      <input type="submit"id="loginButton" class="buttons" value="Enter" 
        onClick={doLogin}/>

        {/* redirect to register page here */}
        <Link to="/register">
          <button className="reg-button">New User? Sign Up Here</button>
        </Link>

      </form>
      <span id="loginResult">{message}</span>
    </div>
  );
}

export default Login;