const TicketsModel = require('../models/ticketModel')
const saveTicket = async (ticket) => await TicketsModel(ticket).save()

const getReportes = async ({ _id }) => {
    const response = await TicketsModel.find({ 'user._id': _id })
    return response
}

const ticketController = {
    saveTicket,
    getReportes
}

module.exports = ticketController