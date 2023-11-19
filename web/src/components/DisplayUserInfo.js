import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { getCookie } from './cookieUtils';
import './UserProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState({});
  const { userID, setUserID } = useUser();
  
  const storedToken = getCookie('token');

  useEffect(() => {
    const storedUserID = getCookie('userID');

    if (storedUserID) {
      setUserID(storedUserID);
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://167.172.230.181:5000/users/user-info/${userID}`, {
          headers: {
            'Authorization': storedToken,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userID, setUserID, storedToken]);

  return (
    <div className="user-profile-container">
      <p className="box-title">Username</p>
      <div className="rounded-box">
        <p className="box-content">{userData.username}</p>
      </div>
      <div className="name-container">
        <div className="name-box">
          <p className="box-title2">First Name</p>
        </div>
        <div className="name-box">
          <p className="box-title2">Last Name</p>
        </div>
      </div>
      <div className="name-container">
        <div className="name-box2">
          <p className="box-content">{userData.firstname}</p>
        </div>
        <div className="name-box2">
          <p className="box-content">{userData.lastname}</p>
        </div>
      </div>
      <div className="user-profile-container">
      <p className="box-title">Email</p>
      <div className="rounded-box">
        <p className="box-content">{userData.email}</p>
      </div>
    </div>
    </div>
  );
}

export default UserProfile;
