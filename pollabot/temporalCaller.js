/* const { apagarGranQuinielaAnterior } = require('./workers/granQuinielaWorker') */
const { repartirPremiosMiniQuiniela } = require('./workers/miniQuinielaWorker')

const temporalCaller = () => {
    console.log("Simulador del bot encendido")
    //apagar la gran quiniela por tiempo
   /*  apagarGranQuinielaAnterior() */

    //iniciar mini quiniela
    repartirPremiosMiniQuiniela()
    //apagar la mini quiniela por tiempo

}

module.exports = temporalCaller