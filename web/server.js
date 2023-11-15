const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Configure middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://BigProject:TryG6F2BdhCa14KB@cluster1.uorvble.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Import and use your route files here
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const attendeesRouter = require('./routes/attendees');
const chatMessagesRouter = require('./routes/chatmessages');

app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/attendees', attendeesRouter);
app.use('/chatmessages', chatMessagesRouter);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//Chat information
let messages = [];

app.use(cors());
app.use(bodyParser.json());

//serve static files
app.use(express.static('public'));

//endpoint to get all messages
app.get('/messages', (req, res) => {
    res.json(messages);
});

//endpoint to handle incoming messages
app.post('/messages', (req, res) => {
    const { message, sender } = req.body;

    if (message && sender) {
        // Store the message in the in-memory storage
        messages.push({ message, sender });

        // Send a success response
        res.status(201).json({ status: 'success', message: 'Message sent successfully.' });
    } else {
        // Send a bad request response if the message or sender is missing
        res.status(400).json({ status: 'error', message: 'Invalid request. Message or sender is missing.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});