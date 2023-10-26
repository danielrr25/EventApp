import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{
    return(
        <div>
            <PageTitle />
            <Login />
        </div>
    );
};

export default LoginPage;





// // src/components/Login.js
// import React, { useState } from "react";

// const Login = () => {

//   var loginName;
//   var loginPassword;

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (event) => {
//     // Handle login logic here
//     var obj = {login:loginName.value,password:loginPassword.value};
//     var js = JSON.stringify(obj);

//     try
//     {
//       const response = await fetch('http://localhost:5000/api/login',
//         {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

//       var res = JSON.parse(await response.text());
      
//       if( res.id <= 0 )
//       {
//         setMessage('User/Password combination incorrect');
//       }
//       else
//       {
//        var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
//        localStorage.setItem('user_data', JSON.stringify(user));
//        setMessage('');
//        window.location.href = '/EventApp';
//       }
//     }
//     catch(e)
//     {
//       alert(e.toString());
//       return;
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
