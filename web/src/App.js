import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage'
import EventPage from './pages/EventPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Add a route for the login page */}
        <Route path="/register" element={<RegisterPage />} /> {/* Add a route for the registration page */}
        <Route path="/event" element={<EventPage />} /> {/* Add a route for the event page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
