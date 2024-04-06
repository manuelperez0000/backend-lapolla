const { getTickets } = require('../../db/controllers/ticketController')
const { getConfig } = require('../../db/controllers/configController')
const { getAnimals } = require('../../db/controllers/animalsController')
const { getAyerYhoy, granQuiniela, filterDate } = require('../utils')
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

const getAnimalsFromDate = async (horaGranQuiniela) => {
    const animalsData = await getAnimals()
    return filterDate(animalsData, horaGranQuiniela)
}

const granQuinielaWinners = async () => {

    try {
        const { fechaHoy, fechaAyer } = getAyerYhoy()

        const [{ premioCasa, horaGranQuiniela, precioGranQuiniela }] = await getConfig()

        const ticketsPromise = getTicketsFromDate(fechaHoy, fechaAyer, horaGranQuiniela)
        const animalsPromise = getAnimalsFromDate(horaGranQuiniela)

        const [tickets, animals] = await Promise.all([ticketsPromise, animalsPromise])
            .catch((error) => {
                console.log(error)
            })

        const animalsArrayIds = animals.map(j => j.animalId)

        const montoVendedores = await tickets.map(item => percent(precioGranQuiniela, item.user.percent)).reduce((a, b) => a + b)

        const ganadores = tickets.filter(ticket => {
            const animalTicket = ticket.animals.map(i => i.id)
            const cantAsiertos = animalTicket.filter(asierto => animalsArrayIds.includes(asierto))
            return cantAsiertos.length === 6
        })

        const cantidadDeGanadores = ganadores.length

        const totalAcumulado = tickets.length * precioGranQuiniela
        const montoPremios = () => cantidadDeGanadores > 0 ? percent(tickets.length * precioGranQuiniela, premioCasa) : 0

        console.log(totalAcumulado)
        console.log(montoVendedores)
        console.log(montoPremios())
        const gananciaCasa = totalAcumulado - montoVendedores - montoPremios()

        //sumar todos tickets.user.percent
        const resultados = {
            fechasQuinielaActual: [fechaHoy, fechaAyer],
            tickets: tickets,
            animalitos: animals,
            porcentajePremio: premioCasa,
            precioQuiniela: precioGranQuiniela,
            tipoQuiniela: 1,
            horaDeLanzamiento: horaGranQuiniela,
            totalAcumulado,
            montoPremios,
            montoVendedores,
            gananciaCasa,
            ganadores,
            cantidadDeGanadores
        }

        console.log(resultados)

    } catch (error) {
        console.log("Ocurrio un error,error:", error)
    }



    //guardar la quiniela
    //crear un reporte de ganancias
}

module.exports = granQuinielaWinners
