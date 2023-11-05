import React, { useState } from "react";
import './Register.css'; // Import your CSS file
import standard_logo2 from './PopOutGradient.png';

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  const handleRegister = async () => {

    //verify all fields completed
    if(!username || !password || !firstName || !lastName || !email){
      setMessage('All fields required to register.')
      return;
    }
    
    // Handle registration logic here
    try {
        // Create a data object with the user's email and password
        const data = {
          username,
          password,
          firstname,
          lastname,
          email,
        };
  
        // Send a POST request to registration API endpoint
        const response = await fetch('http://167.172.230.181:5000/users/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          // Registration successful, you can redirect the user or show a success message
          setMessage('Registration successful!');
        } else {
          // Registration failed, handle errors
          setMessage('Registration failed');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.')
      }
  };

  return (
    <div className="register-container">
      <h2 className="login-title2">WELCOME TO</h2>
        <img src={standard_logo2} alt="Your Logo" className="standard_logo2" />
      <h2 className="register-title">Register</h2>
      <form className="register-form">
        <input
          type="username"
          className="register-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="register-input"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          className="register-input"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          className="register-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="register-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Register;
