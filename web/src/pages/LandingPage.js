import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import landing_logo from './PopOutStandard.png';
import steven from './steven.png';
import oliver from './oliver.png';
import daniel from './dani.png';
import chris from './chris.png';
import carlos from './carlos.png';
import tyler from './tyler.png';
import asha from './asha.png';
import linkedin from './Linkedin.png';

const LandingPage = () => {
  return (
    <div className="landing_background">
      <img src={landing_logo} alt="PopOut" className="landing_logo" />
      <div className="text-under-logo1">
        <p>Discover and create events effortlessly. Find local happenings </p>
        <p>and plan your own gatherings. Join our vibrant community now!</p>
      </div>
      <Link to="/login">
        <button className="cta-button">Get Started</button>
      </Link>
      <div className="text-team">
        <p>Meet the team</p>
      </div>
      <div class="image123">
      <div class="imgContainer">
      <img src={steven} alt="PopOut" height="200" width="200" />
        <p>Steven Camacho</p>
        <p style={{ fontSize: '20px', color: '#c9286b' }}>Project Manager and API</p>
        <a href="https://www.linkedin.com/in/steven-camacho-96a818268/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" width="30" height="30" />
    </a>
      </div>
        <div class="imgContainer">
          <img class="middle-img" src={daniel} alt="PopOut" height="200" width="200" />
          <p>Daniel Rodriguez</p>
          <p style={{ fontSize: '20px', color: '#c9286b' }}>Database</p>
          <a href="https://www.linkedin.com/in/daniel-rodriguez-549255206/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" width="30" height="30" />
    </a>
        </div>
        <div class="imgContainer">
          <img src={oliver} alt="PopOut" height="200" width="200" />
          <p>Oliver Fritsche</p>
          <p style={{ fontSize: '20px', color: '#c9286b' }}>API</p>
          <a href="https://www.linkedin.com/in/oliverfritsche/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" width="30" height="30" />
    </a>
        </div>
      </div>
      <div class="image123">
        <div class="imgContainer2">
          <img src={asha} alt="PopOut" height="200" width="200" />
          <p>Asha Waters</p>
          <p style={{ fontSize: '20px', color: '#c9286b' }}>Frontend Web</p>
          <a href="https://www.linkedin.com/in/ashaswaters/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" width="30" height="30" />
    </a>
        </div>
        <div class="imgContainer2">
          <img class="middle-img" src={tyler} alt="PopOut" height="200" width="200" />
          <p>Tyler Phung</p>
          <p style={{ fontSize: '20px', color: '#c9286b' }}>Frontend Web</p>
          <a href="https://www.linkedin.com/in/tyler-phung-9a99b7270/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" width="30" height="30" />
    </a>
        </div>
        <div class="imgContainer2">
          <img src={chris} alt="PopOut" height="200" width="200" />
          <p>Christopher Fan</p>
          <p style={{ fontSize: '20px', color: '#c9286b' }}>Frontend Mobile</p>
          <a href="https://www.linkedin.com/in/christopherfan123/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" width="30" height="30" />
    </a>
        </div>
        <div class="imgContainer2">
          <img src={carlos} alt="PopOut" height="200" width="200" />
          <p>Carlos Arciniegas</p>
          <p style={{ fontSize: '20px', color: '#c9286b' }}>Frontend Mobile</p>
          <a href="https://www.linkedin.com/in/carlos-arciniegads/" target="_blank" rel="noopener noreferrer">
      <img src={linkedin} alt="LinkedIn" width="30" height="30" />
    </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;