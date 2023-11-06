import React, { useState } from "react";
import './Register.css';
import standard_logo2 from './PopOutGradient.png';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !password || !firstname || !lastname || !email) {
      await setMessage('All fields are required to register.');
      console.log('Message:', message);
      return;
    }

    try {
      const data = {
        username,
        password,
        firstname,
        lastname,
        email,
      };

      const response = await fetch('http://167.172.230.181:5000/users/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setMessage('Registration successful');
        navigate('/login');
      } else if (response.status === 400) {
        await setMessage('Username already exists');
        console.log('Message:', message);
      } else if (response.status === 500) {
        await setMessage('A server error has occurred.');
      } else {
        await setMessage('Unknown error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="login-title2">WELCOME TO</h2>
      <img src={standard_logo2} alt="Your Logo" className="standard_logo2" />
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
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
        <button type="submit" className="register-button">Register</button>
      </form>
       {message && <p className="message">{message}</p>}

    </div>
  );
};

export default Register;
