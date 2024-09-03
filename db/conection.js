/* const runScripts = require('./mongooseScripts') */
const mongoose = require('mongoose')

/* const environment = require('../services/temporalEnv')
const DB_URI = environment.DB_URI */

const DB_URI = 'mongodb://mongo:VpCqlFKvsFzaWoSytFPsJQNQcoxZvUaM@autorack.proxy.rlwy.net:26312'

const dbConnect = async () => {
    
        await mongoose.connect(DB_URI)
        //console.log('DB connected')
        //runScripts()
    
}

module.exports = dbConnect;