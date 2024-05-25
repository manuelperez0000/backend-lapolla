const environment = require('../services/temporalEnv')
const mongoose = require('mongoose')
const DB_URI = environment.DB_URI
const ia = require('../ia')

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log('DB connected', "Start Ia")
        ia()
    } catch (error) {
        console.log('Error en la conexion en la base de datos', error)
        await mongoose.connect(DB_URI)
        throw 'Error en la conexion en la base de datos'
    }
}

module.exports = dbConnect;