const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { ayerYantier } = require('../utils')
const { getTickets } = require('../../db/controllers/ticketController')
const { antier, ayer } = ayerYantier()

const lanzarJugada = async () => {

    console.log("Juagando")

    const fecha = "2024-05-04 09:05:00"
    const date = new Date(fecha)
    console.log(date)

    /* //obtener todos los animalitos de ayer y antier desde las 9 de antier hasta las 9 de ayer
    const animals = (await getFilteredAnimals({ from: antier, to: ayer })).map(animal => animal.animalId)
    //obteber todos los tiquets del mismo rango de fechas y hora
    console.log("obteber tickert")
    const tickets = await getTickets({ from: antier, to: ayer })
    //tomar todos los tickets y retornar quien gano y quin no y con cuantos asiertos 5 o 6
    const winnerTickets = tickets.filter(ticket => {

        const ticketAnimalIds = ticket.animals.map(animal => animal.id)

        let counter = 0
        ticketAnimalIds.forEach(element => animals.includes(element) && counter++)

        console.log("Numero de asiertos:", counter)

        return counter > 4
    })

    console.log(winnerTickets)

    try {

    } catch (error) {
        console.log(error)
    } */
}

module.exports = lanzarJugada