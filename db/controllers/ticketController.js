const TicketsModel = require('../models/ticketModel')
const saveTicket = async (ticket) => await TicketsModel(ticket).save()

const getReportes = async ({ _id }) => await TicketsModel.find({ userId: _id }).sort({ $natural: -1 })

const getTickets = async ({ from, to }) => await TicketsModel.find({ date: { $gte: from, $lt: to } }).sort({ $natural: -1 }).populate('quiniela').limit(200)

const getTicket = async ({ code }) => await TicketsModel.findOne({ code })

const getMyTickets = async (_id) => await TicketsModel.find({ userId: _id }).sort({ $natural: -1 }).populate('quiniela').limit(200)

const verifyIfCodeIsUsed = async (code) => await TicketsModel.findOne({ code })

const countDocuments = async () => await TicketsModel.countDocuments()

const findTicketsByIdQuiniela = async (idQuiniela) =>{
    if(idQuiniela){
        return await TicketsModel.find({ idQuiniela })
    }else{
        return []
    }
}

const setWinnerTicket = async (idTicket) => await TicketsModel.findOneAndUpdate({ _id: idTicket }, { status: 2 })

const setLosserTicket = async (idTicket) => await TicketsModel.findOneAndUpdate({ _id: idTicket }, { status: 3 })

const getTicketsFromUser = async (userId, from, to) => await TicketsModel.find({ userId, date: { $gt: from, $lt: to } })

const compareTicketCode = async (ticketCode) => await TicketsModel.find({ code: ticketCode })

const setGanadores = async (ids) => {
    console.log('ids de los ganadores: ',ids)
    return await TicketsModel.updateMany(
        { _id: { $in: ids } },
        { status: 2 }
    )
}

const setPerdedores = async (ids) => {
    return await TicketsModel.updateMany(
        { _id: { $in: ids } }, // Filtrar por los IDs en la lista
        { status: 3 }
    )
}

const getTicketDate = async (data, user) => {
    const { usuario, date } = data
    const newFrom = date + "T00:00:00.000+00:00";
    const newTo = date + "T23:59:59.000+00:00";
    const from = new Date(newFrom)
    const to = new Date(newTo)

    if (usuario === "propio") {
        const result = await getTicketsFromUser(user._id, from, to)
        return result
    }

    if (usuario === "otros") {
        const result = await getTickets({ from, to })
        return result
    }

    return false

}

const setTicketPagado = async (ticket) => {
    await TicketsModel.findOneAndUpdate({ _id: ticket._id }, { pagado: true })
}

const ticketController = {
    saveTicket,
    getReportes,
    getTickets,
    getTicket,
    getMyTickets,
    verifyIfCodeIsUsed,
    countDocuments,
    findTicketsByIdQuiniela,
    setWinnerTicket,
    setLosserTicket,
    getTicketsFromUser,
    compareTicketCode,
    setGanadores,
    setPerdedores,
    getTicketDate,
    setTicketPagado
}

module.exports = ticketController