const TicketsModel = require('../models/ticketModel')
const saveTicket = async (ticket) => await TicketsModel(ticket).save()

const getReportes = async ({ _id }) => await TicketsModel.find({ userId: _id }).sort({ $natural: -1 })

const getTickets = async ({ from, to }) => await TicketsModel.find({ date: { $gte: from, $lt: to } }).sort({ $natural: -1 }).populate('quiniela').limit(200)

const getTicket = async ({ code }) => await TicketsModel.findOne({ code })

const getMyTickets = async (_id) => await TicketsModel.find({ userId: _id }).sort({ $natural: -1 }).populate('quiniela').limit(200)

const verifyIfCodeIsUsed = async (code) => await TicketsModel.findOne({ code })

const countDocuments = async () => await TicketsModel.countDocuments()

const findTicketsByIdQuiniela = async (idQuiniela) => await TicketsModel.find({ idQuiniela }) || []

const setWinnerTicket = async (idTicket) => await TicketsModel.findOneAndUpdate({ _id: idTicket }, { status: 2 })

const setLosserTicket = async (idTicket) => await TicketsModel.findOneAndUpdate({ _id: idTicket }, { status: 3 })

const getTicketsFromUser = async (userId, from, to) => await TicketsModel.find({ userId, date: { $gt: from, $lt: to } })

const compareTicketCode = async (ticketCode) => await TicketsModel.find({ code: ticketCode })

const setGanadores = async (ids) => {
    return await TicketsModel.updateMany(
        { _id: { $in: ids } }, // Filtrar por los IDs en la lista
        { status: 2 } // Establecer la edad a 18
    )
}

const setPerdedores = async (ids) => {
    return await TicketsModel.updateMany(
        { _id: { $in: ids } }, // Filtrar por los IDs en la lista
        { status: 3 } // Establecer la edad a 18
    )
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
    setPerdedores
}

module.exports = ticketController