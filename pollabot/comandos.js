const { apagarGranQuinielaAnterior } = require('./workers/granQuinielaWorker')

const { apagarMiniQuinielaAnterior, repartirPremiosMiniQuiniela } = require('./workers/miniQuinielaWorker')
console.log("Ejecuta comandos")
const comandos = [
    {
        hora: 9,
        minuto: 0,
        segundo: 0,
        tarea:()=> apagarGranQuinielaAnterior()
    },
    {
        hora: 15,
        minuto: 0,
        segundo: 0,
        tarea:()=> apagarMiniQuinielaAnterior()
    },
    {
        hora: 19,
        minuto: 0,
        segundo: 0,
        tarea:()=> repartirPremiosMiniQuiniela()
    }
]

module.exports = comandos