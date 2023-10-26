const mongoose = require('mongoose');
const { Schema } = mongoose;
const chatMessageSchema = new mongoose.Schema({
    EventId: {
      type: Schema.Types.ObjectId,
      ref: 'events',
      required: true,
    },
    SenderId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
  },
    Tmestamp: {
        type: Date,
        required: true,
    },
    body: {
        type: String, 
        required: true,
    }
});

module.exports = mongoose.model('chatmessages', chatMessageSchema);