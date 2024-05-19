/* const { spesific } = require('robbi') */
const validate = require('../../services/validate')
const { getConfig } = require('../../db/controllers/configController')
const responser = require('../../network/response')
const lanzarJugada = require('./tareas/lanzarJugada')

const pollabot = async () => {
    try {
        console.log("pollabot init")

        const config = await getConfig()

        validate.required(config, "error al obtener los valores de configuracion en el bot")

        const [h, m] = config.horaGranQuiniela.split(":")

        const date = new Date()
        const hora = date.getHours()
        const min = date.getMinutes()

        /* if (hora > h && min > m) {
            return lanzarJugada()
        } else {
            return "la jugada debe hacerse a las " + h + ":" + m
        } */
        //sengodos (s) es requerido

        const lanzarGranQuiniela =()=>{}
        const lanzarMiniquiniela =()=>{}
        
        //granQuiniela
        spesific({ s: 0, m: 0, h: 9 }, () => lanzarGranQuiniela())

        //miniQuinielas
        spesific({ s: 0, m: 0, h: 9 }, () => lanzarMiniquiniela(9))
        spesific({ s: 0, m: 0, h: 13 }, () => lanzarMiniquiniela(13))
        spesific({ s: 0, m: 0, h: 17 }, () => lanzarMiniquiniela(17))

    } catch (error) {
        return false
    }
}


module.exports = pollabot