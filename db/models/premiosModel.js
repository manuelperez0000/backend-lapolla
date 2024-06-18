const mongoose = require('mongoose');

const { Schema } = mongoose;

const Premio = new Schema({
    agencia: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userMethod: {
        type: Object,
        default: {}
    },
    idTicket: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'TicketsModel'
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