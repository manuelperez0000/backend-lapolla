const mongoose = require('mongoose');

const { Schema } = mongoose;

const Config = new Schema({
    premioCasa: {
        type: Number,
        default: 80
    },
    precioGranQuiniela: {
        type: Number,
        default: 25
    },
    precioMiniQuiniela: {
        type: Number,
        default: 25
    },
    horaGranQuiniela: {
        type: Number,
        default: 1
    },
    horasMiniQuiniela: {
        type: Array,
        default: [1, 2, 3]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Config', Config);