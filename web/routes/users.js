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

// delete user route
router.post('/deleteuser', async (req, res) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOneAndRemove({ username });

        if (!existingUser) {
            return res.status(400).send({ error: 'User does not exist' });
        }        
        
        res.status(201).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add friend route
router.post('/addfriend', async (req, res) => {
    try {
        const { myUsername, friendUsername } = req.body;
        const user = await User.findOne({ username: myUsername });
        const friend = await User.findOne({ username: friendUsername });

        if (!user) {
            return res.status(400).send({ error: 'Invalid user' });
        }

        if (!friend) {
            return res.status(404).send({ error: 'Friend does not exist' });
        }

        if (user.friendslist.includes(friend._id)){
            return res.status(408).send({ error: 'Friend already added' });
        }

        user.friendslist.push(friend._id);
        await user.save();
        res.status(201).send({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

//remove friend route
router.post('/removefriend', async (req, res) => {
    try {
        const { myUsername, friendUsername } = req.body;
        const user = await User.findOne({ username: myUsername });
        const friend = await User.findOne({ username: friendUsername });

        if (!user) {
            return res.status(400).send({ error: 'Invalid user' });
        }

        if (!friend) {
            return res.status(404).send({ error: 'Friend does not exist' });
        }

        if (!user.friendslist.includes(friend._id)){
            return res.status(408).send({ error: 'Friend not in list' });
        }

        user.friendslist = user.friendslist.filter(id => id.toString() !== friend._id.toString());
        await user.save();
        res.status(201).send({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
