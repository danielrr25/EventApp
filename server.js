const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Configure middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/eventappdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import and use your route files here
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const attendeesRouter = require('./routes/attendees');
const chatMessagesRouter = require('./routes/chatMessages');

app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/attendees', attendeesRouter);
app.use('/chatMessages', chatMessagesRouter);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
