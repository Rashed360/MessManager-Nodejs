const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    memId: {
        type: String,
        required: false
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 0
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;