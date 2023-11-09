const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');

const router = express.Router();


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://167.172.230.181:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(req.body);
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
    const { username, password,  firstname, lastname,email} = req.body;
    console.log(req.body);
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      username,
      password,
      email,
      firstname,
      lastname
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
      console.log(id);
      // Find the user by ID
      const user = await User.findOne({_id:id});
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
        const { id } = req.body;
        const existingUser = await User.findOne({ _id: id });
        console.log(existingUser);
        if (!existingUser) {
            return res.status(400).send({ error: 'User does not exist' });
        }        
        await User.deleteOne({ _id: id });
        res.status(201).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add friend route
router.post('/addfriend', async (req, res) => {
    try {
        const { userid, idFriend } = req.body;
        const user = await User.findOne({ _id: userid });
        const friend = await User.findOne({ _id: idFriend });

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
        const { userid, idFriend } = req.body;
        const user = await User.findOne({ _id: userid });
        const friend = await User.findOne({ _id: idFriend });

        if (!user) {
            return res.status(400).send({ error: 'Invalid user' });
        }

        if (!friend) {
            return res.status(404).send({ error: 'Friend does not exist' });
        }

        if (!user.friendslist.includes(friend._id)){
            return res.status(408).send({ error: 'Friend does not exist in friends list' });
        }

        user.friendslist.pop(friend._id);
        await user.save();
        res.status(201).send({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// search friend route
router.post('/searchfriend', async (req, res) => {
    
    try {
        const { userid , searchString } = req.body; 

        const userQuery = {};
        const friendQuery = {};

        if (searchString) {
            // This will create a case-insensitive regex that matches any username containing the searchString
            const searchRegex = new RegExp('.*' + searchString + '.*', 'i');
            friendQuery.username = searchRegex;
        }
        const user = await User.findById(idUser); 
        const friend = await User.findOne(friendQuery);          
        
        if (!user) {
            return res.status(400).send({ error: 'Invalid user' });
        }

        if (!friend) {
            return res.status(404).send({ error: 'Friend does not exist' });
        }

        if (!user.friendslist.includes(friend._id)){
            return res.status(408).send({ error: 'Friend not in list' });
        }
        
        res.status(201).json({ user, friend });
        
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

