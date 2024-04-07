/* const { spesific } = require('robbi')
const lanzarJugada = require('./tareas/lanzarJugada')
const crearQuinielaNueva = require('./tareas/crearQuinielaNueva')

const pollabot = () => {
    spesific({ h: 9 }, () => crearQuinielaNueva())
    spesific({ h: 9 }, () => lanzarJugada())
}

module.exports = pollabot */
const lanzarJugada = require('./tareas/lanzarJugada')
const { periodic } = require('robbi')
const crearQuinielaNueva = require('./tareas/crearQuinielaNueva')

const pollabot = () => {
    /* periodic({ s: 15 }, () => crearQuinielaNueva()) */
    /*     periodic({ s: 4 }, () => lanzarJugada()) */
}

module.exports = pollabot 