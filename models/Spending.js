const mongoose = require('mongoose');

const SpendingSchema = new mongoose.Schema({
    spendId: {
        type: String,
        required: true
    },
    memId: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Spending = mongoose.model('Spending', SpendingSchema);
module.exports = Spending;