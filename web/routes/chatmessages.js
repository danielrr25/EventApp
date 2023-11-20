// routes/chatmessages.js

const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chatMessageSchema'); // Import the ChatMessage model
const jwt = require('jsonwebtoken');
const verifyToken  = require('../routes_help/jwt');
const cors = require('cors');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://167.172.230.181:80');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const allowedOrigins = ['www.popout.world', 'popout.world'];
router.use(cors({
  origin: function(origin, callback){
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));

// add chat message route
router.post('/addchatmessage',verifyToken, async (req, res) => {
  try {
    const {EventId, SenderId, Timestamp, body} = req.body;
    console.log(req.body);
    const chatmessage = new ChatMessage({ user:SenderId,event:EventId, timestamp:Timestamp, message:body });
    console.log(chatmessage);
    await chatmessage.save();
    res.status(201).send({ message: 'message added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
});



router.get('/getchatmessages/:eventId',verifyToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const chatMessages = await ChatMessage.find({ event: eventId }).sort({ timestamp: 1 });
    
    res.status(200).json(chatMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;