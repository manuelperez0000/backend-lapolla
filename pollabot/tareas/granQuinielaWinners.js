const { getTickets } = require('../../db/controllers/ticketController')
const { getConfig } = require('../../db/controllers/configController')


const getTicketsFromDate = async (fechaHoy, fechaAyer, horaGranQuiniela) => {
    const newFrom = fechaAyer + "T00:00:00.000+00:00"
    const newTo = fechaHoy + "T23:59:59.000+00:00"

    try {
        const res = await getTickets({ from: newFrom, to: newTo })
        //falta hacer que tome todos desde el dia anterior si en menor a las :horaGranQuiniela
        const filteredHours = res.filter((ticket) => ticket.hora.split(':')[0] > horaGranQuiniela - 1)
        /* console.log(filteredHours) */
        return filteredHours
    } catch (error) {
        console.log(error)
        return false
    }

    const ticketsArray = await getTickets({ $or: [{ date: fechaHoy }, { date: fechaAyer }] })
    return ticketsArray.filter((ticket) => ticket.hora.split(':')[0] > horaPremios - 1)

}

const getAyerYhoy = () => {
    const date = new Date()
    let fechaHoy = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    let fechaAyer = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate() - 1).padStart(2, '0')}`
    return {
        fechaHoy,
        fechaAyer
    }
}

const granQuinielaWinners = async () => {

    //traer todos los animalitos registrados en ese lapso de tiempo ----
    //traer todos los animalitos de ese rango de horas
    //crear un array de ganadores y uno de perdedores 
    //guardar la quiniela como finalizada
    //crear un reporte de ganancias

    //traer todos los tickets de hoy y de ayer desde las 9 am hasta las 9 am de hoy ---

    const date = new Date()
    const { fechaHoy, fechaAyer } = getAyerYhoy()
    const { premioCasa, horaGranQuiniela } = await getConfig()

    const tickets = await getTicketsFromDate(fechaHoy, fechaAyer, horaGranQuiniela)

    console.log({
        fechasQuinielaActual: [fechaHoy, fechaAyer],
        ticketsVendidos: tickets.length,
        cantidadGanadores: 1,
        cantidadPerdedores: 1,
        animalitosEnElRango: [0, 1, 2, 3],
        totalAcumulado: 1,
        porcentajePremio: premioCasa,
        precioGranQuiniela,
        gananciasCasa: 1,
        repartoVendedores: 1,
        gananciaTotal: 1,
        horaDeLanzamiento: "1",
        ganadores: ['id-tickets-ganadores']
    })
}

module.exports = granQuinielaWinners