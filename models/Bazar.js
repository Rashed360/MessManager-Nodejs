const mongoose = require('mongoose');

const BazarSchema = new mongoose.Schema({
    memId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    desc: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    receipt: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    }
});

const Bazar = mongoose.model('Bazar', BazarSchema);
module.exports = Bazar;