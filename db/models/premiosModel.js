const mongoose = require('mongoose');

const { Schema } = mongoose;

const Premio = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    userMethod: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    ticket:{
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Premio', Premio)