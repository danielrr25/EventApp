const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('../models/userSchema');
const { gentoken } = require('../routes_help/verification');
const { sendemailv } = require('../routes_help/emailtransport');
const { sendpasswordv } = require('../routes_help/pemailtransport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken  = require('../routes_help/jwt');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://167.172.230.181:80');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,authorization');
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

const JWT_SECRET = "TheIndustrialRevolutionAndItsConsequencesHaveBeenADisasterForTheHumanRace";//change this to an evniroment variable later

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
   
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        //if (!user.isverified) {
        //    return res.status(400).send({ error: 'Not verified via email' });
        //}
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        // Create a JWT token that expires in 1 hour
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token, userID: user._id, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password,  firstname, lastname,email} = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const emailvtoken = gentoken();

    // Create a new user
    const user = new User({
      username,
      password,
      email,
      firstname,
      lastname,
      emailvtoken 
    });
    await user.save();

    sendemailv(user.email, emailvtoken);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user-info/:id',verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
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

//reset password route that sends email with code to user
router.post('/resetpassword', async (req, res) => {
    try {
        const { email } = req.body;
      
        // Find the user by ID
        const user = await User.findOne({email});
        if (!user) {
          return res.status(404).json({ error: 'Invalid email' });
        }

        const passwordtoken = gentoken();
        user.passwordvtoken=passwordtoken;
        await user.save();
        sendpasswordv(user.email, passwordtoken);

        return res.status(201).send('Email sent successfully');
        } catch (error) {
          res.status(500).send(error);
        }
});

//reset password enter code route for code to be entered from email
router.post('/resetpasswordentercode', async (req, res) => {
    try {
        const { code } = req.body;
          
        // Find the user by ID
        const user = await User.findOne({passwordvtoken:code});
          
        if (!user) {
          return res.status(404).json({ error: 'Invalid code' });
        }
        user.passwordvtoken=null;
        await user.save();

        return res.status(201).send('Correct code');
        } catch (error) {
          res.status(500).send(error);
        }
});

//change password route
router.post('/changepassword', async (req, res) => {
    try {
        const { username, newpassword, confirmpassword } = req.body;
        
        const user = await User.findOne({username});
        if (!user) {
          return res.status(404).json({ error: 'username does not exist' });
        }
        if (newpassword != confirmpassword){
            return res.status(400).send('passwords do not match');
        }
        const isMatch = await bcrypt.compare(confirmpassword, user.password);
        
        if (isMatch){
            return res.status(408).send({error: 'cannot repeat a past password '});
        }                 
        // Mark the email as verified
        user.password = newpassword;           
        await user.save();
        
        return res.status(201).send('Password changed successfully');
        } catch (error) {
            res.status(500).send(error);
        }
});

//email verification route
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

