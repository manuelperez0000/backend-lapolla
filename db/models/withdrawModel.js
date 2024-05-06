const mongoose = require('mongoose');

const { Schema } = mongoose;

const Withdraw = new Schema({
    user: {
        type: Object,
        required: true
    },
    payMethod: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Withdraw', Withdraw);