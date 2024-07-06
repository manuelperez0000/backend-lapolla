const mongoose = require('mongoose');

const { Schema } = mongoose;

const PagoQuiniela = new Schema({
    idAgencia: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    idQuiniela: {
        type: Schema.Types.ObjectId,
        ref:"QuinielaModel"
    },
    idTransfer:{
        type: Schema.Types.ObjectId,
        ref:"Transfer",
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('PagoQuiniela', PagoQuiniela)