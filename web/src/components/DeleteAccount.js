import React, { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './cookieUtils'; // Import getCookie utility
import './DeleteAccount.css';

function DeleteAccount() {
  const [message, setMessage] = useState('');
  const { userID } = useUser();
  const navigate = useNavigate();

  // Retrieve the token from the cookie
  const storedToken = getCookie('token');

  const handleDeleteAccount = async () => {
    console.log('UserID:', userID);
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
      try {
        var obj = { id: userID }; // Include the userID in the request object
        var js = JSON.stringify(obj);

        const response = await fetch('http://167.172.230.181:5000/users/deleteuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': storedToken, // Include the token in the headers
          },
          body: js,
        });

        console.log(response);

        if (response.status === 201) {
          setMessage('Account deleted successfully.');
          navigate('/login');
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
      <h2 className="delete-account-title">Delete Account</h2>
      <h2 className="logout-title">Logout</h2>
      <button onClick={handleDeleteAccount} id="delete-account-button">
        Delete Account
      </button>

      <span className="delete-account-result">{message}</span>
    </div>
  );
}

export default DeleteAccount;
