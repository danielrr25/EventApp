import React, { useState, useEffect, useCallback } from 'react';
import { getCookie } from './cookieUtils';

function Chat({ eventId }) {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const storedToken = getCookie('token');
  const storedUserID = getCookie('userID');
  const userID = storedUserID || '';

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`http://167.172.230.181:5000/chatmessages/getchatmessages/${eventId}`, {
        headers: {
          'Authorization': storedToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server (fetchMessages):', errorData);
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setMessages(data);
        console.log('Received messages:', data);
      } else {
        console.error('Invalid data structure received from server (fetchMessages):', data);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  }, [eventId, storedToken]);

  useEffect(() => {
    if (chatVisible && eventId !== null) {
      fetchMessages();
    }
  }, [chatVisible, eventId, fetchMessages]);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
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
          'Authorization': storedToken,
        },
        body: JSON.stringify({ userID: userID, eventId: eventId, timestamp: timestamp, message: userInput.toString() }),
      });

      console.log('User ID:', userID);
      console.log('Event ID:', eventId);
      console.log('Timestamp:', timestamp);
      console.log('User Input:', userInput.toString());

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server (sendMessage):', errorData);
        throw new Error('Failed to send message');
      }

      setUserInput('');
      console.log('Message sent successfully');
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
                <div
                  key={index}
                  className={message.type === 'received' ? 'received' : 'sent'}>
                  {message.message}
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
