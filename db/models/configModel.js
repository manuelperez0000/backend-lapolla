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
        type: String,
        default: 1
    },
    horasMiniQuiniela: {
        type: Array,
        default: [1, 2, 3]
    },
    date: {
        type: Date,
        default: Date.now
    },
    premioAcumuladoMini: {
        type: Number,
        default: 0
    },
    premioAcumuladoGran: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Config', Config);