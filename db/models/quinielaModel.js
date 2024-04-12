const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuinielaModel = new Schema({
    precioQuiniela: {
        type: Number,
        required: true
    },
    horaDeLanzamiento: {
        type: Number,
        required: true
    },
    tipoQuiniela: {
        type: String,
        required: true
    },
    porcentajePremio: {
        type: Number,
        required: true
    },
    acumulado: {
        type: Number,
        default: 0
    },
    ganadores5Asiertos: {
        type: Number,
        default: 0
    },
    ganadores6Asiertos: {
        type: Number,
        default: 0
    },
    gananciasCasa: {
        type: Number,
        default: 0
    },
    winners: {
        type: Array,
        defaultValue: []
    },
    losers: {
        type: Array,
        defaultValue: []
    },
    resultAnimals: {
        type: Array,
        defaultValue: []
    },
    fechaQuiniela: {
        type: Date,
        default: Date.now
    },
    montoVendedores: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('quinielaModel', QuinielaModel);