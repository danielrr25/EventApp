const mongoose = require('mongoose');
const { Schema } = mongoose;
const chatMessageSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  event: { type: Schema.Types.ObjectId, ref: 'events' },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
