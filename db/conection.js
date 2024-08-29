const environment = require('../services/temporalEnv')
/* const runScripts = require('./mongooseScripts') */
const mongoose = require('mongoose')
const DB_URI = environment.DB_URI

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 30000
        })
        console.log('DB connected')
        //runScripts()
    } catch (error) {
        console.log('Error en la conexion en la base de datos', error)
    }
}

module.exports = dbConnect;