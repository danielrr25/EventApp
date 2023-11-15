const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    profilepicture: {
        type: Buffer,
        required: false,
    },
    emailvtoken: {
        type: String,
        required: false,
    },
    passwordvtoken: {
        type: String,
        required: false,
    },
    isverified: {
        type: Boolean,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    friendslist: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false,
    }]
});


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports = mongoose.model('users', userSchema);
