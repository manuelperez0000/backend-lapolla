const TicketsModel = require('../models/ticketModel')
const saveTicket = async (ticket) => await TicketsModel(ticket).save()

const getReportes = async ({ _id }) => await TicketsModel.find({ 'user._id': _id }).sort({ $natural: -1 })

const getTickets = async ({ from, to }) => await TicketsModel.find({ date: { "$gte": from, "$lt": to } }).sort({ $natural: -1 }).limit(50)

const getTicket = async ({ code }) => await TicketsModel.findOne({ code })

const getMyTickets = async (_id) => await TicketsModel.find({ "user._id": _id }).sort({ $natural: -1 }).limit(100)

const verifyIfCodeIsUsed = async (code) => await TicketsModel.findOne({ code })

const countDocuments = async () => await TicketsModel.countDocuments()

const findTicketsByIdQuiniela = async (idQuiniela) => await TicketsModel.find({idQuiniela})

const ticketController = {
    saveTicket,
    getReportes,
    getTickets,
    getTicket,
    getMyTickets,
    verifyIfCodeIsUsed,
    countDocuments,
    findTicketsByIdQuiniela
}

module.exports = ticketController