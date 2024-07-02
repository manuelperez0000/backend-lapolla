const mongoose = require('mongoose');

const { Schema } = mongoose;

const report = new Schema({
    ticketsSold: {
        type: Number,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true
    },
    totalSold: {
        type: Number,
        required: true
    },
    adminAmount: {
        type: Number,
        required: true
    },
    gruperoAmount: {
        type: Number,
        required: true
    },
    agenciaAmount: {
        type: Number,
        required: true
    },
    premio: {
        type: Number,
        required: true
    },
    homeBalance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userType: {
        type: Number,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
})


module.exports = mongoose.model('report', report);

//hacer una peticion que regrese las quinielas en un rango de fecha espesifico
//dentro tambien pedir los tickets vendidos por esta agencia en el mismo rango de fecha

/* {
    [quinielas from , to],
    [tickets, from to]
    user:_id
} */