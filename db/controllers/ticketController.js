const TicketsModel = require('../models/ticketModel')
const saveTicket = async (ticket) => await TicketsModel(ticket).save()

const ticketController = {
    saveTicket
}

module.exports = ticketController