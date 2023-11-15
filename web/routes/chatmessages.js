// routes/chatmessages.js

const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chatMessageSchema'); // Import the ChatMessage model


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://167.172.230.181:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// add chat message route
router.post('/addchatmessage', async (req, res) => {
  try {
    const {EventId, SenderId, Timestamp, body} = req.body; 
    const chatmessage = new ChatMessage({ user:SenderId,event:EventId, timestamp:Timestamp, message:body });
    console.log(chatmessage);
    await chatmessage.save();
    res.status(201).send({ message: 'message added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/getchatmessages/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    console.log(eventId);
    const chatMessages = await ChatMessage.find({ event: eventId }).sort({ timestamp: 1 });
    
    res.status(200).json(chatMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;