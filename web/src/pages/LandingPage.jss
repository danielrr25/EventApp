import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './LandingPage.css';
import logo from './PopOutStandard.png';

const LandingPage = () => {
  return (
    <div className="background">
      <img src={logo} alt="PopOut" className="logo" />
      <div className="text-under-logo">
        <p>Discover and create events effortlessly. Find local happenings </p>
        <p>and plan your own gatherings. Join our vibrant community now!</p>
      </div>
      <Link to="/login"> {/* Use Link to navigate to the login page */}
        <button className="cta-button">Get Started</button>
      </Link>
      <div className="spacer"></div>
    </div>
  );
};

export default LandingPage;
