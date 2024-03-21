const mongoose = require('mongoose');

const { Schema } = mongoose;

const Animals = new Schema({
    name: {
        type: String,
        required: true
    },
    animalId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Animals', Animals);