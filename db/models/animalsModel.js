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
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    hora: {
        type: Number,
        required: true
    },
    roulet: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Animals', Animals);