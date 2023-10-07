// eventSchema.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // Define your schema fields here
  name: String,
  date: Date,
  description: String,
  // ... other fields
});

module.exports = mongoose.model('Event', eventSchema);
