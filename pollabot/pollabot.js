const { spesific } = require('robbi')

const lanzarJugada = require('./tareas/lanzarJugada')

const pollabot = () => {
    //sengodos (s) es requerido
    spesific({ s: 1, m: 57, h: 16 }, () => lanzarJugada())
}

module.exports = pollabot