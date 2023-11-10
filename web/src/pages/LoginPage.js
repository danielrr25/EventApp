import React from 'react';
import Login from '../components/Login';
import './LoginPage.css';
import login_logo from './PopOut.png';

const LoginPage = () => {
    return (
        <div className="split-signup">
            <div className="form-container">
                <Login />
                <div className="logo-container">
                    <img src={login_logo} alt="Your Logo" className="login_logo" />
                    <div className="logo-text">
                       Log in to discover new events that intrest you.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;