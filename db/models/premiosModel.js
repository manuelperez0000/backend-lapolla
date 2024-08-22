const mongoose = require('mongoose');

const { Schema } = mongoose;

const Premio = new Schema({
    payMethod: {
        type: Object,
        required: true,
    },
    ticket: {
        type: Object,
        required: true,
    },
    amount:{
        type: Number,
        required: true
    },
    userData:{
        type: Object,
        required: true
    },
    agencia: Schema.Types.ObjectId,
    payerId: {
        type: Schema.Types.ObjectId || String,
        default:""
    },
    status:{
        type: Boolean,
        default: false
    },
    ref:{
        type: String,
        default:""
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Premio', Premio)

/* const userData = {
    name,ci,phone,
}

const bankData = {
    bankName,
    acountNumber,
    type
} */