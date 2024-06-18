const pollabot = require('../pollabot/pollabot')
const environment = require('../services/temporalEnv')
const mongoose = require('mongoose')
const DB_URI = environment.DB_URI

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log('DB connected - iniciar pollabot')
        pollabot()
    } catch (error) {
        console.log('Error en la conexion en la base de datos', error)
        await mongoose.connect(DB_URI)
        throw 'Error en la conexion en la base de datos'
    }
}

module.exports = dbConnect;