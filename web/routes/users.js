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

        res.send({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, firstname, lastname, email } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        const user = new User({ username, password, firstname, lastname, email });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
