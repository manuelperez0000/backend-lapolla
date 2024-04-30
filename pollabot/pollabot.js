const { spesific } = require('robbi')

const lanzarJugada = require('./tareas/lanzarJugada')

const pollabot = () => {
    //sengodos (s) es requerido
    spesific({ s: 0, m: 0, h: 9 }, () => lanzarJugada())
}

module.exports = pollabot