const { getQuinielaByDate } = require('../../db/controllers/quinielaController')
const { getTicketsFromUser } = require('../../db/controllers/ticketController')
const formatFromTo = (from, to) => ({ from: `${from}T00:00:00.000+00:00`, to: `${to}T23:59:59.000+00:00` })
const { getPaydQuinielas } = require('../pagoQuiniela/pagoService')

exports.getReport = async (userId, from, to) => {
    const dates = formatFromTo(from, to)

    // Realizar las llamadas a las dos funciones en paralelo utilizando Promise.all()
    const [tickets, quinielas, paydQuinielas] = await Promise.all([
        getTicketsFromUser(userId, dates.from, dates.to),
        getQuinielaByDate(dates.from, dates.to),
        getPaydQuinielas(userId)
    ])

    //extraer todos los id de las quinielas de los tickets
    const idQuinielas = tickets.map(i => String(i.idQuiniela))
    const arraySinRepetidos = [...new Set(idQuinielas)]
    //filtrar las quinielas que necesito nadamas
    const quinielasNedded = quinielas.filter(i => arraySinRepetidos.includes(String(i._id)))

    //crear un objeto con cada quiniela con sus tickets 
    return quinielasNedded.map(quinielaNeed => {

        const filteredTickets = tickets.filter(ticket => String(quinielaNeed._id) === String(ticket.idQuiniela))
        const transfer = paydQuinielas.filter(i => String(i.idQuiniela) === String(quinielaNeed._id))[0]?.idTransfer

        console.log("transfer: ", transfer)

        return {
            count: quinielaNeed.count,
            porcentajePremio: quinielaNeed.porcentajePremio,
            tipoQuiniela: quinielaNeed.tipoQuiniela,
            horaDeLanzamiento: quinielaNeed.horaDeLanzamiento,
            precioQuiniela: quinielaNeed.precioQuiniela,
            acumulado: quinielaNeed.acumulado,
            ganadores5Asiertos: quinielaNeed.ganadores5Asiertos,
            ganadores6Asiertos: quinielaNeed.ganadores6Asiertos,
            gananciasCasa: quinielaNeed.gananciasCasa,
            winners: quinielaNeed.winners,
            losers: quinielaNeed.losers,
            resultAnimals: quinielaNeed.resultAnimals,
            montoVendedores: quinielaNeed.montoVendedores,
            status: quinielaNeed.status,
            _id: quinielaNeed._id,
            fechaQuiniela: quinielaNeed.fechaQuiniela,
            date: quinielaNeed.date,
            tickets: filteredTickets,
            transfer
        }
    })
}
