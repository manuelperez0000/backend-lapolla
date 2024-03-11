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
    date: {
        type: Date,
        default: Date()
    }
})

module.exports = mongoose.model('Tickets', TicketsModel);