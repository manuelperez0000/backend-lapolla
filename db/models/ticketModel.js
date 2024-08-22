const mongoose = require('mongoose');

const { Schema } = mongoose;

const TicketsModel = new Schema({
    user: {
        type: Object,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId
    },
    quinielaType: {
        type: String,
        required: true
    },
    animals: {
        type: Array,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1 //1 proceso, 2 perderdor, 3 ganador y 4 anulado
    },
    report: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    pagado: {
        type: Boolean,
        required: true,
        default: false
    },
    idQuiniela: Schema.Types.ObjectId,
    quiniela: {
        type:Schema.Types.ObjectId,
        ref:"quinielaModel",
    }
})

module.exports = mongoose.model('Tickets', TicketsModel);