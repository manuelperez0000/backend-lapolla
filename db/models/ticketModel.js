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
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Tickets', TicketsModel);