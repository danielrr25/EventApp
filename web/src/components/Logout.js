import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import the useUser hook
import './Logout.css';

function Logout() {
  const navigate = useNavigate();
  const { setUserID } = useUser(); // Access the setUserID function from the context

  const handleLogout = () => {
    setUserID(null); // Clear the userID from the context
    navigate('/login'); // Navigate to the login page or any other appropriate route
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}

export default Logout;
