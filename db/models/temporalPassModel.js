const mongoose = require('mongoose');

const { Schema } = mongoose;

const temporalPassModel = new Schema({
    email:{
        type:String,
        required:true
    },
    temporalPass:{
        type:String,
        required:true
    },
    date: { 
        type: Date,
         default: Date.now 
    }
})

module.exports = mongoose.model('temporalPassModel', temporalPassModel);