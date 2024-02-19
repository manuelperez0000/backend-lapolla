const mongoose = require('mongoose');

const { Schema } = mongoose;

const Bank = new Schema({
    name: {
        type:String,
        required: true,
        default:""
    },
    accountNumbre:{
        type:String,
        required: true,
    },
    accountType:{
        type:String,
        required: true,
    },
    userId:{
        type:String,
        required: true,
    },
    date: { 
        type: Date,
         default: Date.now 
    }
})

module.exports = mongoose.model('Bank', Bank);