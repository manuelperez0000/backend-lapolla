const { getLastActive } = require('../../db/controllers/quinielaController')
const { findTicketsByIdQuiniela } = require('../../db/controllers/ticketController')

exports.getPollas = async () => {

    //1 obtener todos los tickets para calcular el monto de gran y mini
    // con quiniela actual podemos obtener las quinielas en juego en este momento
    // obtener las quinielas actuales
    const activeGran = await getLastActive({ tipoQuiniela: 1 })
    const activeMini = await getLastActive({ tipoQuiniela: 2 })


    const ticketsMini = await findTicketsByIdQuiniela(activeMini._id)
    const ticketsGran = await findTicketsByIdQuiniela(activeGran._id)

    console.log('ticketsMini', ticketsMini)


    const gran = (ticketsMini?.length || 0) * 25 * 0.8
    const mini = (ticketsGran?.length || 0) * 25 * 0.8
    const pollas = { mini, gran }
    return pollas
}