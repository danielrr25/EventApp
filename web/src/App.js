import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import AddEventPage from './pages/AddEventPage';
import AccountPage from './pages/AccountPage';
import EventPage from './pages/EventPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/addevent" element={<AddEventPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
