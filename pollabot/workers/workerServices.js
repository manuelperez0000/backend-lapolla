const { savePremio } = require("../../db/controllers/premioController")
const { setWinnerTicket } = require("../../db/controllers/ticketController")
const { icreaseUserBalance } = require("../../db/controllers/userController")

exports.pagoDeClientes = (ticket,premio) => {
    const userId = ticket.user._id
    setWinnerTicket(ticket._id)
    icreaseUserBalance({ _id: userId, balance: premio })
}

exports.pagoDeAgencias = (ticket,premio) => {
    //generar un premio
    const idTicket = ticket._id
    const idAgencia = ticket.user._id
    savePremio({ idTicket, agencia: idAgencia, amount: premio })
}

