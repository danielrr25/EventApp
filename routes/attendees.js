// routes/attendees.js

const express = require('express');
const router = express.Router();
const Attendee = require('../models/attendeeSchema'); // Import the Attendee model

// Define your routes and endpoints here

// Example route for creating an attendee
router.post('/create', async (req, res) => {
  try {
    const attendee = new Attendee(req.body); // Create a new attendee from the request body
    const savedAttendee = await attendee.save(); // Save the attendee to the database
    res.json(savedAttendee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Other routes (read, update, delete) can be defined similarly

module.exports = router;
