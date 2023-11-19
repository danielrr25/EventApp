import React, { useState } from 'react';
import './EmailPopup.css';

function EmailPopup({ onSubmit, email, setEmail, message }) {
  const [error, setError] = useState(null);

  const handleFormSubmit = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    onSubmit();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="popup-overlay1">
      <div className="popup1">
        <h3>Enter Email</h3>
        <input
          type="email"
          id="forgotPasswordEmail"
          className="rounded-input-email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default EmailPopup;