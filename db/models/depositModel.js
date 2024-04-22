const mongoose = require('mongoose');
const { Schema } = mongoose;

const Deposit = new Schema({
    nombre: {
        type: String,
        default: ""
    },
    cedula: {
        type: String,
        default: ""
    },
    correo: {
        type: String,
        default: ""
    },
    tipo: {
        type: String,
        default: ""
    },
    cuenta: {
        type: String,
        default: ""
    },
    banco: {
        type: String,
        default: ""
    },
    methodName: {
        type: String,
        required: true,
        default: ""
    },
    telefono: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    depositDate: {
        type: Date,
        required: true
    },
    state: {
        type: Number,
        default: 1
    },
    monto: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Deposit', Deposit);