const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    name: {
        type:String,
        required: true,
        default:""
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        require:true,
        default:0
    },
    token:{
        type:String,
        require:false,
        default:""
    }
})

module.exports = mongoose.model('User', User);