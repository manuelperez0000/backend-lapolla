const { spesific } = require('robbi')
const comandos = require('./comandos')
const temporalCaller = require('./temporalCaller')
const pollabot = async () => {
    temporalCaller()
    /* try {
        console.log("pollabot Iniciado")
        comandos.forEach(comand => {
            spesific({ s: comand.segundo, m: comand.minuto, h: comand.hora }, () => comand.tarea())
        })
    } catch (error) {
        return error?.message || "Error en el bot"
    } */
}


module.exports = pollabot