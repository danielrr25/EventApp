import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import AddEventPage from './pages/AddEventPage';
import AccountPage from './pages/AccountPage';
import EventPage from './pages/EventPage';
import EventInfoPage from './pages/EventInfoPage';
import UserEvents from './components/UserCreatedEvents';

import { UserProvider } from './components/UserContext';
import { AttendanceProvider } from './components/AttendanceContext'; // Import the AttendanceProvider

function App() {
  return (
  <UserProvider>
    <AttendanceProvider> {/* Wrap the App with AttendanceProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addevent" element={<AddEventPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/eventinfo/:eventId" element={<EventInfoPage />} />
          <Route path="/userevents/:userId" element={<UserEvents />} />
        </Routes>
      </Router>
    </AttendanceProvider>
  </UserProvider>
);
}


export default App;