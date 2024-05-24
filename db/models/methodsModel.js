const mongoose = require('mongoose');
const { Schema } = mongoose;

const Method = new Schema({
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
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    secondary:{
        type: String,
        required: true
    },
    deleted:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Method', Method);