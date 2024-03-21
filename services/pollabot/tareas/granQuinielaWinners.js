const { getTickets } = require('../../../db/controllers/ticketController')

const getTicketsFromDate = async (fechaHoy, fechaAyer, horaPremios) => {
    const ticketsArray = await getTickets({ $or: [{ date: fechaHoy }, { date: fechaAyer }] })
    return ticketsArray.filter((ticket) => ticket.hora.split(':')[0] > horaPremios - 1)
}


const granQuinielaWinners = async () => {
    //traer todos los tickets de hoy y de ayer desde las 9 am hasta las 9 am de hoy ---
    //traer todos los animalitos registrados en ese lapso de tiempo ----
    //traer todos los animalitos de ese rango de horas
    //crear un array de ganadores y uno de perdedores 
    //guardar la quiniela como finalizada
    //crear un reporte de ganancias
    const date = new Date()
    const fechaHoy = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const fechaAyer = `${date.getDate() - 1}-${date.getMonth() + 1}-${date.getFullYear()}`
    const horaHoy = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const horaPremios = 9
    const tickets = await getTicketsFromDate(fechaHoy, fechaAyer, horaPremios)
    const registeredAnimal = await getRegisteredAnimal()

}

module.exports = granQuinielaWinners