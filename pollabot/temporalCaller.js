const { apagarGranQuinielaAnterior } = require('./workers/granQuinielaWorker')

const temporalCaller = () => {
    console.log("Simulador del bot encendido")
    //apagar la gran quiniela por tiempo
    apagarGranQuinielaAnterior()

    //apagar la mini quiniela por tiempo

}

module.exports = temporalCaller