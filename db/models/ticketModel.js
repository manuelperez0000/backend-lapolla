const mongoose = require('mongoose');

const { Schema } = mongoose;

const TicketsModel = new Schema({
    user: {
        type: Object,
        required: true
    },
    quinielaType: {
        type: String,
        required: true
    },
    animals: {
        type: Array,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Tickets', TicketsModel);