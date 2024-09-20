const { getGanadores } = require('../../api/animals/animalServices')
/* const {  getObjectFormated } = require('../../api/animals/animalServices') */
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
    let objResult = {}
    //obtener la granquiniela de ayer
    const granQuinielaAyer = await getAyerQuiniela(1)

    console.log("granQuinielaAyer: ", granQuinielaAyer)

    if (granQuinielaAyer) {
        objResult.getGranQuinielaAyer = granQuinielaAyer
    } else {
        objResult.getGranQuinielaAyer = false
    }

    //si esta apagada no hacer nada
    if (granQuinielaAyer?.status) {

        const resultDesactivar = await finalizarQuiniela(granQuinielaAyer._id)

        console.log("resultDesactivar: ", resultDesactivar)

        if (resultDesactivar) {
            objResult.descativarQuiniela = true
        } else {
            objResult.descativarQuiniela = false
        }

        /* console.log("resultDesactivar:", resultDesactivar) */
        //buscar ganadores
        const animals = await getFilteredAnimals({ from, to })

        if (animals.length > 0) {
            objResult.findedAnimals = animals
        } else {
            objResult.findedAnimals = "No se encontraron animalitos"
        }

        const ticketsFindedGran = await findTicketsByIdQuiniela(granQuinielaAyer._id)

        if (ticketsFindedGran > 0) {
            objResult.ticketsGranQuiniela = ticketsFindedGran
        } else {
            objResult.ticketsGranQuiniela = "No se encontraron tickets"
        }


        //const formatedObjectTickets = getObjectFormated(ticketsFindedGran, animals)

        /* console.log(formatedObjectTickets) */
        //editar todos los tickets ganadores y perdedores


        const ganadores5 = getGanadores({ aciertos: 5, animals, ticketsFindedGran })
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
    const createQuiniela = await createNewQuiniela(1)

    if (createQuiniela) {
        objResult.createQuiniela = true
    } else {
        objResult.createQuiniela = "Fallo al crear la nueva quiniela"
    }

    return objResult
}

module.exports = {
    apagarGranQuinielaAnterior
}
