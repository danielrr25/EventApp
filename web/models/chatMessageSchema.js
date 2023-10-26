const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    EventId: {
      type: Number,
      ref: 'events',
      required: true,
    },
    SenderId: {
      type: Number,
      ref: 'users',
      required: false,
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