const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        require: true
    },
    pool: {
        type: Number,
        required: true
    },
    successes5: {
        type: Number,
        required: true
    },
    successes6: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    profitPercent: {
        type: Number,
        required: true
    },
    totalProfit: {
        type: Number,
        required: true
    },
    winers: {
        type: Array,
        required: false,
        defaultValue: []
    },
    loosers: {
        type: Array,
        required: false,
        defaultValue: []
    }
})

module.exports = mongoose.model('User', User);