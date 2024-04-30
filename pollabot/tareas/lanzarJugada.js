const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { ayerYantier } = require('../utils')
const { getTickets } = require('../../db/controllers/ticketController')
const { antier, ayer, ayerFinalTarde, ayerTicket } = ayerYantier()
const crearQuinielaNueva = require('./trash/crearQuinielaNueva')
const { updateQuiniela } = require('./controllers/updateQuiniela')

const lanzarJugada = async () => {

    console.log("Inicio: lanzarJugada")

    try {

        //crear quiniela nueva y devolver el id de la quiniela creada para este dia
        const idNuevaQuiniela = await crearQuinielaNueva()
        //obtener todos los animalitos de ayer y antier desde las 9 de antier hasta las 9 de ayer
        const resultAnimals = await getFilteredAnimals({ from: ayer, to: ayerFinalTarde })
        const animals = resultAnimals.map(animal => animal.animalId)
        //obteber todos los tiquets del mismo rango de fechas y hora
        const tickets = await getTickets({ from: antier, to: ayerTicket })
        //tomar todos los tickets y retornar quien gano y quien no y con cuantos asiertos 5 o 6
        const getWinnersOrLossers = (_tickets, _animals, win) => {
            return _tickets.filter(ticket => {
                const ticketAnimalIds = ticket.animals.map(animal => animal.id)
                let counter = 0
                ticketAnimalIds.forEach(element => _animals.includes(element) && counter++)
                return win === "winners" ? counter > 4 : counter < 5
            })
        }

        const winners = getWinnersOrLossers(tickets, animals, "winners")
        /* const losers = getWinnersOrLossers(tickets, animals, "lossers") */
        //actualizar la quiniela creada
        await updateQuiniela({ winners, idNuevaQuiniela, resultAnimals })
        //generar el reporte

    } catch (error) {
        console.log(error)
    }
    return
}

module.exports = lanzarJugada