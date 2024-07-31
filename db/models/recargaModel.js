const mongoose = require('mongoose');
const { Schema } = mongoose;

const Recarga = new Schema({
    amount: {
        type: Number,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recarga', Recarga);