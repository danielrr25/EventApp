// routes/chatmessages.js

const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chatMessageSchema'); // Import the ChatMessage model

// Define your routes and endpoints here

// Example route for creating a chat message
router.post('/create', async (req, res) => {
  try {
    const chatMessage = new ChatMessage(req.body); // Create a new chat message from the request body
    const savedChatMessage = await chatMessage.save(); // Save the chat message to the database
    res.json(savedChatMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Other routes (read, update, delete) can be defined similarly

module.exports = router;
