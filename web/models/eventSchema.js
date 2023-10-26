const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        unique:true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventLocation: {
        type: String,
        required: true,
    },
    listAntendees:[{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false,
    }],

    
});


module.exports = mongoose.model('events', eventSchema);
