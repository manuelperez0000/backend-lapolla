const mongoose = require('mongoose');

const { Schema } = mongoose;

const Premio = new Schema({
    payMethod: {
        type: Object,
        default: {}
    },
    ticket: {
        type: Object,
        required: true,
    },
    amount:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Premio', Premio)