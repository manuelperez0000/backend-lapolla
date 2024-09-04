/* const runScripts = require('./mongooseScripts') */
const mongoose = require('mongoose')

const environment = require('../services/temporalEnv')
const DB_URI = environment.DB_URI

//const DB_URI = "mongodb+srv://bitmarketperu:Asking03-.@cluster0.7dmn5.mongodb.net/quinielas?retryWrites=true&w=majority&appName=quinielas"

const dbConnect = async () => {
    
        await mongoose.connect(DB_URI)
        console.log('DB connected')
        //runScripts()
    
}

module.exports = dbConnect;