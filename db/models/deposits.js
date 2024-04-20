const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    name: {
        type: String,
        default: ""
    },
    ci: {
        type: String,
        unique: true,
        required: true,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        default: ""
    },
    account: {
        type: String,
        default: ""
    },
    bank: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    operationDate: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User);