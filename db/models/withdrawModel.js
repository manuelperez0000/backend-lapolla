const mongoose = require('mongoose');

const { Schema } = mongoose;

const Withdraw = new Schema({
    userId: Schema.Types.ObjectId,
    adminMethodId:Schema.Types.ObjectId,
    amount:{
        type:Number,
        required: true
    },
    state:{
        type:Number,
        default:1
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Withdraw', Withdraw);