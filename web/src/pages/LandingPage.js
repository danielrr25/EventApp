import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from './PopOutStandard.png';
import pfp from './Pfp.png';

const LandingPage = () => {
  return (
    <div className="background">
      <img src={logo} alt="PopOut" className="logo" />
      <div className="text-under-logo">
        <p>Discover and create events effortlessly. Find local happenings </p>
        <p>and plan your own gatherings. Join our vibrant community now!</p>
      </div>
      <Link to="/login">
        <button className="cta-button">Get Started</button>
      </Link>
      <div className="text-team">
        <p>Meet the team</p>
      </div>
      <div class="image123" style={{ display: 'flex' }}>
        <div class="imgContainer">
          <img src={pfp} alt="PopOut" height="200" width="200" />
          <p>Steven Camacho</p>
        </div>
        <div class="imgContainer">
          <img class="middle-img" src={pfp} alt="PopOut" height="200" width="200" />
          <p>Daniel Rodriguez</p>
        </div>
        <div class="imgContainer">
          <img src={pfp} alt="PopOut" height="200" width="200" />
          <p> Oliver Fritsche</p>
        </div>
      </div>
      <div class="image123" style={{ display: 'flex' }}>
        <div class="imgContainer2">
          <img src={pfp} alt="PopOut" height="200" width="200" />
          <p>Asha Waters</p>
        </div>
        <div class="imgContainer2">
          <img class="middle-img" src={pfp} alt="PopOut" height="200" width="200" />
          <p>Tyler Phung</p>
        </div>
        <div class="imgContainer2">
          <img src={pfp} alt="PopOut" height="200" width="200" />
          <p>Christopher Fan</p>
        </div>
        <div class="imgContainer2">
          <img src={pfp} alt="PopOut" height="200" width="200" />
          <p>Carlos Arciniegas</p>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default LandingPage;
