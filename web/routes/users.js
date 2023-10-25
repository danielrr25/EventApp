// routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        res.send({ message: 'Logged in successfully' });

    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        console.log(req.body);
        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        // Create a new user
        const user = new User({ username, password });
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;



