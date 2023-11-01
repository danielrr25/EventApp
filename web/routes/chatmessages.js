// routes/chatmessages.js

const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chatMessageSchema'); // Import the ChatMessage model

// add chat message route
router.post('/addchatmessage', async (req, res) => {
  try {
    const {EventId, SenderId, Timestamp, body} = req.body; 
    const chatmessage = new ChatMessage({ EventId, SenderId, Timestamp, body });
    await chatmessage.save();
    res.status(201).send({ message: 'message added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Other routes (read, update, delete) can be defined similarly

module.exports = router;
