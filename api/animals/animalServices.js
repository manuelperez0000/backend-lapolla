const { icreaseUserBalance } = require("../../db/controllers/userController")
const { required, number } = require("../../services/validate")
const config = require('../../config.json')

const getGanadores = async ({ aciertos, animals, ticketsFinded }) => {
    try {
        required([aciertos, animals, ticketsFinded])
        number(aciertos, "Aciertos debe ser un numero")
        const idsAnimals = animals.map(i => i.animalId)
        return ticketsFinded.filter(ticket =>
            ticket.animals.filter(animal =>
                idsAnimals.includes(animal.id)).length === aciertos ? true : false)
    } catch (error) {
        console.log(error)
    }
}


const getCalc = (quinielaType, percent) => quinielaType === "1" ? percent / 100 * config.precioGranQuiniela : percent / 100 * config.precioMiniQuiniela

const pagarPorcentajeDeGananciaStaff = (ticket) => {

    const { quinielaType } = ticket
    const agencia = ticket.user
    const balanceAgencia = getCalc(quinielaType, agencia?.percent)
    icreaseUserBalance({ _id: agencia._id, balance: balanceAgencia })
    const grupero = ticket.user?.grupero
    if (grupero) {
        const balanceGrupero = getCalc(quinielaType, grupero?.percent)
        icreaseUserBalance({ _id: grupero._id, balance: balanceGrupero })
    }

    const admin = ticket.user?.admin
    if (admin) {
        const balanceAdmin = getCalc(quinielaType, admin?.percent)
        icreaseUserBalance({ _id: admin._id, balance: balanceAdmin })
    }

}

module.exports = {
    getGanadores,
    pagarPorcentajeDeGananciaStaff
}