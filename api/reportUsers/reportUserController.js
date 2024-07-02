const { getQuinielaByDate } = require('../../db/controllers/quinielaController')
const { getTicketsFromUser } = require('../../db/controllers/ticketController')
const formatFromTo = (from, to) => ({ from: `${from}T00:00:00.000+00:00`, to: `${to}T23:59:59.000+00:00` })

exports.getReport = async (userId, from, to) => {
    const dates = formatFromTo(from, to)

    // Realizar las llamadas a las dos funciones en paralelo utilizando Promise.all()
    const [tickets, quinielas] = await Promise.all([
        getTicketsFromUser(userId, dates.from, dates.to),
        getQuinielaByDate(dates.from, dates.to)
    ])
    //extraer todos los id de las quinielas de los tickets
    const idQuinielas = tickets.map(i => String(i.idQuiniela))
    const arraySinRepetidos = [...new Set(idQuinielas)]

    //filtrar las quinielas que necesito nadamas
    const quinielasNedded = quinielas.filter(i => arraySinRepetidos.includes(String(i._id)))

    //crear un objeto con cada quiniela con sus tickets 
    return quinielasNedded.map(i => {
        return {
            count: i.count,
            porcentajePremio: i.porcentajePremio,
            tipoQuiniela: i.tipoQuiniela,
            horaDeLanzamiento: i.horaDeLanzamiento,
            precioQuiniela: i.precioQuiniela,
            acumulado: i.acumulado,
            ganadores5Asiertos: i.ganadores5Asiertos,
            ganadores6Asiertos: i.ganadores6Asiertos,
            gananciasCasa: i.gananciasCasa,
            winners: i.winners,
            losers: i.losers,
            resultAnimals: i.resultAnimals,
            montoVendedores: i.montoVendedores,
            status: i.status,
            _id: i._id,
            fechaQuiniela: i.fechaQuiniela,
            date: i.date,
            tickets
        }
    })
}