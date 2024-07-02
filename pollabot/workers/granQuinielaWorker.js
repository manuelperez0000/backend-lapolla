const { getGanadores } = require('../../api/animals/animalServices')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { getAyerQuiniela, finalizarQuiniela, premioAcumuladoQuiniela } = require('../../db/controllers/quinielaController')
const { findTicketsByIdQuiniela } = require('../../db/controllers/ticketController')
const { getFromTo } = require('../../services/utils')
const { setPremioAcumulado } = require('../../db/controllers/configController')
const createNewQuiniela = require('../../api/quiniela/newQuiniela')
const { from, to } = getFromTo()
const config = require('../../config.json')
const { pagoDeClientes, pagoDeAgencias } = require('./workerServices')

const apagarGranQuinielaAnterior = async () => {
    console.log("Apagar gran quiniela ejecutado")
    
    //obtener la granquiniela de ayer
    const granQuinielaAyer = await getAyerQuiniela(1)
    //si esta apagada no hacer nada
    if (granQuinielaAyer?.status) {
        const resultDesactivar = await finalizarQuiniela(granQuinielaAyer._id)
        console.log("resultDesactivar:" , resultDesactivar)
        //buscar ganadores
        const animals = await getFilteredAnimals({ from, to })
        const ticketsFindedGran = await findTicketsByIdQuiniela(granQuinielaAyer._id)

        const ganadores5 = await getGanadores({ aciertos: 5, animals, ticketsFindedGran })
        //obtener todos los tickets de esta quiniela y ver si hay ganadores
        const premioTotal = config.precioGranQuiniela * ticketsFindedGran.length * config.porcentajePremio * config.premio5aciertos
        const premio = ganadores5?.length > 0 ? premioTotal / ganadores5.length : 0

        if (ganadores5.length > 0) {

            ganadores5.forEach(ticket => {
                if (ticket.user.level === 5) pagoDeClientes(ticket, premio)
                if (ticket.user.level === 4) pagoDeAgencias(ticket, premio)
            })
        } else {

            //si no se consigue ganador: acumular premio
            setPremioAcumulado(premioTotal, 1)
            premioAcumuladoQuiniela(granQuinielaAyer._id, premioTotal)
        }
    }

    //iniciar nueva quiniela
    createNewQuiniela(1)
}

module.exports = {
    apagarGranQuinielaAnterior
}
