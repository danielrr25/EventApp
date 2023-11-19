const mongoose = require('mongoose');
const { Schema } = mongoose;
const eventSchema = new mongoose.Schema({
    creatorID:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    eventName: {
        type: String,
        required: true,
        unique:true,
    },
    eventCategory: {
        type: String,
        required: true,
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
    listAttendees: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: false,
    }],
    
    eventIcon:{
        type: String,
        required: true,
    }



    
});


module.exports = mongoose.model('events', eventSchema);