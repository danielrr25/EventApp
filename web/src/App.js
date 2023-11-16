import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import AddEventPage from './pages/AddEventPage';
import AccountPage from './pages/AccountPage';
import EventPage from './pages/EventPage';
import EventInfoPage from './pages/EventInfoPage';


import { UserProvider } from './components/UserContext'; // Import the UserProvider
import FriendPage from './pages/FriendPage';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <UserProvider> {/* Wrap your entire app with UserProvider */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addevent" element={<AddEventPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/eventinfo" element={<EventInfoPage />}/>
          <Route path="/friend" element={<FriendPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
