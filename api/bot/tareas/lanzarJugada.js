const { getFilteredAnimals } = require('../../../db/controllers/animalsController')
const { ayerYantier } = require('../utils')
const { getTickets } = require('../../../db/controllers/ticketController')
const crearQuinielaNueva = require('./crearQuinielaNueva')
const { updateQuiniela, closeQuiniela } = require('../controllers/updateQuiniela')
const { getWinnersOrLossers } = require('../utils')
const getActiveQuiniela = require('../../../api/tickets/utils')
const { antier, ayer, ayerFinalTarde, ayerTicket } = ayerYantier()

const lanzarJugada = async () => {

    console.log("Inicio: lanzarJugada")

    try {

        //crear quiniela nueva y devolver el id de la quiniela creada para este dia
        const response = await crearQuinielaNueva({ type: "granQuiniela" })
        if (!response) throw "No se pudo crear la quiniela"
        //obtener todos los animalitos de ayer y antier desde las 9 de antier hasta las 9 de ayer

        const resultAnimals = await getFilteredAnimals({ from: ayer, to: ayerFinalTarde })
        const animals = resultAnimals.map(animal => animal.animalId)
        //obteber todos los tiquets del mismo rango de fechas y hora

        const tickets = await getTickets({ from: antier, to: ayerTicket }) //revisar

        //tomar todos los tickets y retornar quien gano y quien no y con cuantos asiertos 5 o 6
        const winners = getWinnersOrLossers(tickets, animals, "winners")

        //obtener la quiniela activa anterior
        const quinielaAnterior = await getActiveQuiniela()
        const idQuinielaAnterior = quinielaAnterior._id
        console.log(idQuinielaAnterior)
        //finalizar quiniela anterior
        const respFinalizarquiniela = await closeQuiniela(idQuinielaAnterior)
        if (!respFinalizarquiniela) throw "No se pudo finalizar la quiniela anterior"

        //actualizar la quiniela anterior
        await updateQuiniela({ winners, idQuinielaAnterior, resultAnimals })


    } catch (error) {
        console.log(error)
    }
    return
}

module.exports = lanzarJugada