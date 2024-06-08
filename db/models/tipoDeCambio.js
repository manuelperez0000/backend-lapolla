const mongoose = require('mongoose');

const { Schema } = mongoose;

const TipoDeCambio = new Schema({
    user: {
        type: Object,
        required: true,
    },
    method: {
        type: Object,
        required: true
    },
    current: {
        type: Number,
        required: true
    },
    later: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('TipoDeCambio', TipoDeCambio)