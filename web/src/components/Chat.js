import React, { useState, useEffect } from 'react';
import { getCookie } from './cookieUtils';

function Chat({eventId}) {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const storedToken = getCookie('token');
  const storedUserID = getCookie('userID');
  const userID = storedUserID || '';

  useEffect(() => {
    if (chatVisible && eventId !== null) {
      fetchMessages();
    }
  }, [chatVisible, eventId]);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://167.172.230.181:5000/chatmessages/getchatmessages/${eventId}`, {
        headers: {
          'Authorization': storedToken, // Include the JWT token in the headers
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.map(message => ({ ...message, type: 'received' })));
      console.log('Received messages:', data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      const response = await fetch('http://167.172.230.181:5000/chatmessages/addchatmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': storedToken, // Include the JWT token in the headers
        },
        body: JSON.stringify({ userID: userID, eventId: eventId, timestamp: timestamp, message: userInput}),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setUserInput('');
      fetchMessages(); // Update messages after sending a new message
    } catch (error) {
      console.error('Error sending chat message:', error);
    }
  };

  return (
    <div className="ChatClass">
      <button id="chatbtn" onClick={toggleChat}>
        Toggle Chat
      </button>

      {chatVisible && (
        <div id="chat-popup">
          <div id="chat-header">
            <span id="chat-title">Chat</span>
            <button id="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div id="chat-body">
          <div id="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={message.type === 'received' ? 'received' : 'sent'}>
                {message.message} {/* Use the correct property name (message.message) */}
          </div>

              ))}
            </div>
            <input
              type="text"
              id="user-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
