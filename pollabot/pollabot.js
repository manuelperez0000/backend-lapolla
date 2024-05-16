const { spesific } = require('robbi')
const lanzarJugada = require('./tareas/lanzarJugada')
const validate = require('../services/validate')
const { getConfig } = require('../db/controllers/configController')

const pollabot = async () => {
    try {

        const config = await getConfig()
        validate.required(config, "error al obtener los valores de configuracion en el bot")

        const [h, m] = config.horaGranQuiniela.split(":")

        //sengodos (s) es requerido
        spesific({ s: 0, m:Number(m), h:Number(h) }, () => lanzarJugada())

    } catch (error) {
        console.log(error)
    }
}

module.exports = pollabot