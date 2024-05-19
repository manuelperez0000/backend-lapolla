const { getTickets } = require('../../../db/controllers/ticketController')
const { getConfig } = require('../../../db/controllers/configController')
const { getAyerYhoy, granQuiniela, filterDate } = require('../../utils')
const percent = (monto, porcentaje) => monto * porcentaje / 100

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

const granQuinielaWinners = async () => {

    try {
        const { fechaHoy, fechaAyer } = getAyerYhoy()

        const { premioCasa, horaGranQuiniela, precioGranQuiniela } = await getConfig()

        const tickets = await getTicketsFromDate(fechaHoy, fechaAyer, horaGranQuiniela)

        if (tickets.length === 0) throw 'No se encontraron tickets'

        const ticketsPercent = await tickets.map(item => percent(precioGranQuiniela, item.user.percent))
        const montoVendedores = ticketsPercent.reduce((a, b) => a + b)

        const totalAcumulado = tickets.length * precioGranQuiniela
        const getMontoPremios = () => percent(totalAcumulado, premioCasa)

        //sumar todos tickets.user.percent
        const resultados = {
            fechaQuiniela: fechaHoy,
            tickets: tickets,
            porcentajePremio: premioCasa,
            precioQuiniela: precioGranQuiniela,
            tipoQuiniela: 1,
            horaDeLanzamiento: horaGranQuiniela,
            totalAcumulado,
            montoPremios: getMontoPremios(),
            montoVendedores, //sumar total gruperos, admin, agencias
        }

        console.log(resultados)

    } catch (error) {
        console.log("Ocurrio un error:", error)
    }



    //guardar la quiniela
    //crear un reporte de ganancias
}


module.exports = granQuinielaWinners
