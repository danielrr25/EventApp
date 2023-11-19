import React, { useState } from "react";
import './Register.css';
import standard_logo2 from './PopOutGradient.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationErrorMessage, setVerificationErrorMessage] = useState(''); // Add state for verification error
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    // Reset error message
    setErrorMessage('');

    if (!username || !password || !firstname || !lastname || !email) {
      setErrorMessage('All input fields must be filled.');
      return;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must contain at least 8 characters, one uppercase letter, one number, one lowercase letter, and one special character.');
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
        setShowVerificationPopup(true);
        setOverlayActive(true);
      } else if (response.status === 400) {
        setErrorMessage('Username already exists');
      } else if (response.status === 500) {
        setErrorMessage('A server error has occurred.');
      } else {
        setErrorMessage('Unknown error');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleVerification = async (event) => {
    event.preventDefault();

    // Reset verification code error
    setVerificationErrorMessage('');

    try {
      const data = {
        emailvtoken: verificationCode,
      };

      const response = await fetch('http://167.172.230.181:5000/users/verifyemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        navigate('/login');
      } else if (response.status === 400) {
        setVerificationErrorMessage('Invalid verification code');
      } else if (response.status === 500) {
        setVerificationErrorMessage('A server error has occurred.');
      } else {
        setVerificationErrorMessage('Unknown error');
      }
    } catch (error) {
      setVerificationErrorMessage('An error occurred. Please try again.');
    }
  };
  
  return (
    <div className="register-container">
      {/* Add the overlay with conditional active class */}
      <div className={`overlay ${overlayActive ? 'active' : ''}`}></div>

      <h2 className="login-title2">WELCOME TO</h2>
      <img src={standard_logo2} alt="Your Logo" className="standard_logo2" />
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          className={`register-input ${errorMessage ? 'error' : ''}`}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          className={`register-input ${errorMessage ? 'error' : ''}`}
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          className={`register-input ${errorMessage ? 'error' : ''}`}
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          className={`register-input ${errorMessage ? 'error' : ''}`}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className={`register-input ${errorMessage ? 'error' : ''}`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="register-button">Register</button>
      </form>
      <p className={`error-message ${showVerificationPopup ? 'verification-popup-error' : ''}`}>{errorMessage}</p>

     {showVerificationPopup && (
        <div className={`verification-popup ${overlayActive ? 'active' : ''}`}>
          <h2>Enter Verification Code From Email</h2>
          <form onSubmit={handleVerification}>
            <input
              type="text"
              className={`verification-input ${verificationErrorMessage ? 'error' : ''}`}
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button type="submit" className="verification-button">Verify</button>
          </form>
          <p className={`error-message2`}>{verificationErrorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Register;