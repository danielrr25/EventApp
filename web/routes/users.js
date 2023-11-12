const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
const { genemailtoken } = require('../everification');
const { sendemailv } = require('../emailtransport');
const jwt = require('jsonwebtoken');
const router = express.Router();



const JWT_SECRET = "TheIndustrialRevolutionAndItsConsequencesHaveBeenADisasterForTheHumanRace";//change this to an evniroment variable later
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://167.172.230.181:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const verifyToken = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Unauthorized access: Invalid token' });
        }
        req.user = decoded; // Add the decoded token to the request for use in your routes
        next();
      });
    } else {
      res.status(403).json({ error: 'A token is required for authentication' });
    }
  };
  

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        // Create a JWT token that expires in 1 hour
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userID: user._id, message: 'Logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    console.log("JWT SECRET: " + JWT_SECRET);
    try {
        const { username, password, firstname, lastname, email } = req.body;

        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const newUser = new User({
            username,
            password,
            firstname,
            lastname,
            email
        });

        await newUser.save();

        // Create a JWT token that expires in 1 hour
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/user-info/:id',verifyToken, async (req, res) => {
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
router.post('/deleteuser',verifyToken, async (req, res) => {
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
router.post('/addfriend',verifyToken, async (req, res) => {
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
router.post('/removefriend',verifyToken, async (req, res) => {
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
router.post('/searchfriend',verifyToken, async (req, res) => {
    
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
        const friends = await User.find(friendQuery);          
        
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

router.post('/verifyemail', async (req, res) => {
    try {
        const { emailvtoken } = req.body;

        const user = await User.findOne({emailvtoken });
        
        if (!user) {
            return res.status(400).send('Invalid verification token');
        }

        // Mark the email as verified
    user.isverified = true;
    user.emailvtoken = null;
    await user.save();

    return res.status(201).send('Email verified successfully');
    } catch (error) {
        res.status(500).send(error);
    }
    });

module.exports = router;

module.exports = router;

