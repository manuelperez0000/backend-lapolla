const mongoose = require('mongoose');

const { Schema } = mongoose;

const report = new Schema({ 
    ticketsSold:{
        type:Number,
        required:true,
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
    }
})


module.exports = mongoose.model('report', report);