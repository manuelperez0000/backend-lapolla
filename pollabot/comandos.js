const { apagarGranQuinielaAnterior } = require('./workers/granQuinielaWorker')
const { repartirPremiosMiniQuiniela } = require('./workers/miniQuinielaWorker')
const createNewQuiniela = require('../api/quiniela/newQuiniela')

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
        tarea:()=> createNewQuiniela(2)
    },
    {
        hora: 19,
        minuto: 0,
        segundo: 0,
        tarea:()=> repartirPremiosMiniQuiniela()
    }
]

module.exports = comandos