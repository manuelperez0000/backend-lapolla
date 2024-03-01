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
    }

})

module.exports = mongoose.model('Method', Method);