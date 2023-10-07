// This file defines the schema (structure) for your User documents.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // other user-related fields
});

module.exports = mongoose.model('User', userSchema);
