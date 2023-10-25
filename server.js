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
