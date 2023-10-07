// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Import the User model

// Define your routes and endpoints here

// Example route for creating a user
router.post('/create', async (req, res) => {
  try {
    const user = new User(req.body); // Create a new user from the request body
    const savedUser = await user.save(); // Save the user to the database
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Other routes (read, update, delete) can be defined similarly

module.exports = router;


