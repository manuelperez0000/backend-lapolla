const { getTickets } = require('../../db/controllers/ticketController')
const { getConfig } = require('../../db/controllers/configController')
const { saveQuiniela } = require('../../db/controllers/quinielaController')

const { getAyerYhoy, granQuiniela, filterDate } = require('../utils')

const getTicketsFromDate = async (fechaHoy, fechaAyer, horaGranQuiniela) => {
    const newFrom = fechaAyer + "T00:00:00.000+00:00"
    const newTo = fechaHoy + "T23:59:59.000+00:00"

    try {
        const tickets = await getTickets({ from: newFrom, to: newTo })

        const filteredTickets = filterDate(tickets, horaGranQuiniela)

        const filterType = filteredTickets.filter(ticket => ticket.quinielaType === granQuiniela)

        return filterType
    } catch (error) {
        console.log(error)
        return false
    }

}

const crearQuinielaNueva = async () => {
    console.log("Nueva quiniela creada")

    try {
        const { fechaHoy, fechaAyer } = getAyerYhoy()
        const _id = '6605c4d1f867d9fa9e7d161b'
        const { premioCasa, horaGranQuiniela, precioGranQuiniela } = await getConfig(_id)

        const tickets = await getTicketsFromDate(fechaHoy, fechaAyer, horaGranQuiniela)

        if (tickets.length === 0) throw 'No se encontraron tickets'

        const resultados = {
            precioQuiniela: precioGranQuiniela,
            horaDeLanzamiento: horaGranQuiniela,
            tipoQuiniela: 1,
            porcentajePremio: premioCasa,
            fechaQuiniela: fechaHoy,
        }

        //guardar en quinielas

        const quiniela = await saveQuiniela(resultados)

        console.log("resultados:", resultados, quiniela)
        console.log("Quniela save", quiniela)

    } catch (error) {
        console.log("Ocurrio un error:", error)
    }



    //guardar la quiniela
    //crear un reporte de ganancias
}


module.exports = crearQuinielaNueva
