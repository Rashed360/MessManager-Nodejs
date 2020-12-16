const mongoose = require('mongoose');

const MoneySchema = new mongoose.Schema({
    memId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    memName: {
        type: String,
        required: true
    },
    mType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Money = mongoose.model('Money', MoneySchema);
module.exports = Money;