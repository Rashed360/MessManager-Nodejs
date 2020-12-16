const mongoose = require('mongoose');

const ConsumerSchema = new mongoose.Schema({
    memId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    memName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const MealSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    consumer: [ConsumerSchema]
});

const Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;