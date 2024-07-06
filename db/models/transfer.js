const mongoose = require('mongoose');

const { Schema } = mongoose;

const Transfer = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    to: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    amount: {
        type: Number,
        required: true
    },
    payMethod: {
        type: Schema.Types.ObjectId,
        ref:"Method"
    },
    status:{
        type:Number,
        default:0
    },
    ref: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Transfer', Transfer)

