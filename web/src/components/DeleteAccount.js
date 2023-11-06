import React, { useState } from 'react';

function DeleteAccount() {
  const [message, setMessage] = useState('');
  var loginName;

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      try {
        const username = loginName;
        const obj = { username };
        const js = JSON.stringify(obj);

        const response = await fetch('http://167.172.230.181:5000/users/deleteuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: js,
        });
        
        console.log(response);

        if (response.status === 201) {
          setMessage('Account deleted successfully.');
        } else {
          setMessage('Account deletion failed.');
        }
      } catch (error) {
        setMessage('An error occurred while deleting the account.');
      }
    }
  };

  return (
    <div className="delete-account-container">
      <h2 className="delete-account-title">DELETE YOUR ACCOUNT</h2>
      <p className="delete-account-info">
        Are you sure you want to delete your account? This action cannot be undone.
      </p>
      <button onClick={handleDeleteAccount} className="delete-account-button">
        Delete Account
      </button>

      <span className="delete-account-result">{message}</span>
    </div>
  );
}

export default DeleteAccount;