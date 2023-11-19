import React from 'react';
import Register from '../components/Register';
import './RegisterPage.css';
import register_logo from './PopOut.png';


const RegisterPage = () => {
    return (
        <div className="split-signup2">
            <div className="form-container2 register-container2">
                <Register />
                <div className="logo-container-register">
                    <img src={register_logo} alt="Your Logo" className="register_logo" />
                    <div className="logo-text2">
                       Register to discover events that intrest you.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;