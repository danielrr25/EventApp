const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        res.send({userID:user._id ,message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, password, email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      firstname,
      lastname,
      username,
      password,
      email,
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user-info/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate the provided ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
