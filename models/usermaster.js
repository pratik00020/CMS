const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    User_ID: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['E', 'A', 'C']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    MobNo: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    enteredBy: {
        type: String,
        required: true
    },
    enteredAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
