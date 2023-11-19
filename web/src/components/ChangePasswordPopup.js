import React from 'react';

function ChangePasswordPopup({ onSubmit, username, setUsername, newPassword, setNewPassword, confirmPassword, setConfirmPassword, message }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Change Password</h3>
        <input
          type="text"
          id="username"
          className="stacked-input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="newPassword"
          className="stacked-input"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          className="stacked-input"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
        {message && <p className="popup-message">{message}</p>}
      </div>
    </div>
  );
}

export default ChangePasswordPopup;
