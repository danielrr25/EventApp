// src/components/Register.js
import React, { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');


  const handleRegister = async () => {
    // Handle registration logic here
    try {
        // Create a data object with the user's email and password
        const data = {
          email,
          password,
          firstName,
          lastName,
        };
  
        // Send a POST request to registration API endpoint
        const response = await fetch('http://localhost:5050/api/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          // Registration successful, you can redirect the user or show a success message
          setMessage('Registeration successful!');
        } else {
          // Registration failed, handle errors
          setMessage('Registration failed');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.')
      }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input
          type="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Register;