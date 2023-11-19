import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "./User.png";
import "./Events.css"; // Import the CSS file
import NewLogo from './PopOutNew.png';

function Event() {
  return (
    <div>
    <div className="logo-container">
          <img src={NewLogo} alt="Your Logo" className="new_logo" />
        </div>
        
      <Link to="/account">
        <img src={UserIcon} alt="User" className="UserIcon" />
      </Link>
    </div>
  );
}

export default Event;