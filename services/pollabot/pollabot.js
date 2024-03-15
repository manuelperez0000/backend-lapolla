const { periodic } = require('robbi')

const tarea1 = require('./tareas/tarea1')

const pollabot = () => {
    periodic({ s: 50 }, () => tarea1())
}

module.exports = pollabot