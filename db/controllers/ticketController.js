const TicketsModel = require('../models/ticketModel')
const saveTicket = async (ticket) => await TicketsModel(ticket).save()

const getReportes = async ({ _id }) => {
    const response = await TicketsModel.find({ 'user._id': _id }).sort({ $natural: -1 })
    return response
}

const getTickets = async ({ from, to }) => await TicketsModel.find({ date: { "$gte": from, "$lt": to } }).sort({ $natural: -1 })

const getTicket = async ({ code }) => await TicketsModel.findOne({ code })

const ticketController = {
    saveTicket,
    getReportes,
    getTickets,
    getTicket
}

module.exports = ticketController