/* const runScripts = require('./mongooseScripts') */
const mongoose = require('mongoose')
const environment = require('../services/temporalEnv')
const DB_URI = environment.DB_URI

const dbConnect = async () => {
        await mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000, // 30 segundos
                socketTimeoutMS: 45000 // 45 segundos
        })
        console.log('DB connected')
        //runScripts()
}

module.exports = dbConnect;