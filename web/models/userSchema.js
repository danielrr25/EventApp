const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection('mongodb://localhost/mydatabase'); // Replace with your MongoDB connection string
autoIncrement.initialize(connection);

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilepicture: {
        type: Buffer,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    friendslist: [{
        type: Number,
        ref: 'users',
        required: false,
    }]
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports = mongoose.model('users', userSchema);
