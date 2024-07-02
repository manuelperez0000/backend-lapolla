const { spesific, periodic } = require('robbi')
/* const { apagarGranQuinielaAnterior } = require('./workers/granQuinielaWorker') */
const { repartirPremiosMiniQuiniela } = require('./services/repartirPremiosMiniQuiniela')
const { createNewMiniQuiniela2 } = require('./services/createNewMiniQuiniela')

const pollabot = async () => {
    try {
        console.log("pollabot Iniciado")

        /* 
        spesific({ s: 0, m: 0, h: 10 }, () => apagarGranQuinielaAnterior())
        */
        const date = new Date()
        const m = date.getMinutes() + 1
        console.log("min: " + m )
        //spesific({ s: 0, m, h: 15 }, () => createNewMiniQuiniela2()) //listo
        spesific({ s: 0, m, h: 16 }, () => repartirPremiosMiniQuiniela()) 
 
        /* periodic({ s: 1 }, () => {
            const date = new Date()
            const time = date.getSeconds()
            console.log(time)
        }) */

    } catch (error) {
        return error?.message || "Error en el bot"
    }
}

module.exports = pollabot



/* const temporalCaller = require('./temporalCaller') */
/*     temporalCaller() */