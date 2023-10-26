const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const eventSchema = new mongoose.Schema({
    eventID: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator:Number.isInteger,
            message:"ID must be integer"
        }
    },
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
        type: Number,
        ref: 'users',
        required: false,
    }],

    
});

eventSchema.plugin(autoIncrement.plugin, {
    model: 'events',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('events', userSchema);
