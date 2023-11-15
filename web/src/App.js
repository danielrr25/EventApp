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

  //chat functionality
    const [chatVisible, setChatVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
  
    const toggleChat = () => {
      setChatVisible(!chatVisible);
    };
  
    const sendMessage = () => {
      if (userInput.trim() === '') {
        return;
      }
  
      setMessages([...messages, userInput]);
      setUserInput('');
    };


  return (
    <><BrowserRouter>
      <UserProvider> {/* Wrap your entire app with UserProvider */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addevent" element={<AddEventPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/eventinfo" element={<EventInfoPage />} />
          <Route path="/friend" element={<FriendPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
    
    {/* chat implementation */}
    <div className="App">
        <div id="chat-popup" style={{ display: chatVisible ? 'block' : 'none' }}>
          <div id="chat-header">
            <span id="chat-title">Chat</span>
            <button id="close-btn" onClick={toggleChat}>×</button>
          </div>
          <div id="chat-body">
            <div id="chat-messages">
              {messages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
            <input
              type="text"
              id="user-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div></>
  );
}

export default App;
