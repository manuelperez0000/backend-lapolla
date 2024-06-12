const mongoose = require('mongoose');

const { Schema } = mongoose;

const Withdraw = new Schema({
    payMethod:{
        type:Object,
        required:true
    },
    user:{
        type:Object,
        required:true
    },
    userId:{
        type:Schema.ObjectId,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
    referencia:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Withdraw', Withdraw);