/* const { icreaseUserBalance } = require("../../db/controllers/userController") */
const config = require('../../config.json')

const isWinner = (ticket, animals, aciertos) => {
    const idsAnimals = animals.map(i => i.animalId)
    let total = 0
    ticket.animals.forEach(animal => {
        if (idsAnimals.includes(animal.id)) total += 1
    })

    return total === aciertos
}

const getGanadores = ({ aciertos, animals, ticketsFinded }) => {
    if(ticketsFinded.legth > 0){
        const res = ticketsFinded?.filter(ticket => isWinner(ticket, animals, aciertos))
        return res
    }else{
        return []
    }
}

const getObjectFormated = (ticketsFindedGran, animals, aciertos = 5) => {
    const obj = { winners: [], loosers: [] }
    //recorrer los tickes en juego
    ticketsFindedGran.forEach(ticket => {
        if (isWinner(ticket, animals, aciertos)) {
            obj.winners.push(ticket)
        } else {
            obj.loosers.push(ticket)
        }
    })
    return obj
}

const getCalc = (quinielaType, percent) => quinielaType === "1" ? percent / 100 * config.precioGranQuiniela : percent / 100 * config.precioMiniQuiniela

const pagarPorcentajeDeGananciaStaff = (ticket) => {

    const { quinielaType } = ticket
    const agencia = ticket.user
    const balanceAgencia = getCalc(quinielaType, agencia?.percent)
    /* icreaseUserBalance({ _id: agencia._id, balance: balanceAgencia }) */
    const grupero = ticket.user?.grupero
    if (grupero) {
        const balanceGrupero = getCalc(quinielaType, grupero?.percent)
        /* icreaseUserBalance({ _id: grupero._id, balance: balanceGrupero }) */

        /******************************************************************************************* */
        //aumentar tambien el balance del admin **************************************************//
        /******************************************************************************************* */
    }

    const admin = ticket.user?.admin
    if (admin) {
        const balanceAdmin = getCalc(quinielaType, admin?.percent)
        /*  icreaseUserBalance({ _id: admin._id, balance: balanceAdmin }) */
    }

}

const getMontoGranQuiniela = ({ ganadores, premioGranQuiniela, cantidadTickets, precioQuiniela, porcentajePremio, premio, acumulado }) => {
    if (ganadores.length === 0 || !ganadores) return 0
    const total = cantidadTickets * precioQuiniela * porcentajePremio * premioGranQuiniela * premio / ganadores.length + (acumulado * premio / ganadores.length)
    //console.log({ ganadores, premioGranQuiniela, cantidadTickets, precioQuiniela, porcentajePremio, premio, acumulado })
    return total
}

const getMontoMiniQuiniela = ({ ganadores, premioMiniQuiniela, cantidadTickets, precioQuiniela, porcentajePremio, acumulado }) => {
    if (ganadores.length === 0 || !ganadores) return 0
  /*   console.log("getMonto mini: ") */
    /* console.log({ ganadores, premioMiniQuiniela, cantidadTickets, precioQuiniela, porcentajePremio, acumulado }) */
    
    return cantidadTickets * precioQuiniela * porcentajePremio * premioMiniQuiniela / ganadores.length + (acumulado * premioMiniQuiniela / ganadores.length)

}

module.exports = {
    getGanadores,
    pagarPorcentajeDeGananciaStaff,
    getObjectFormated,
    isWinner,
    getMontoGranQuiniela,
    getMontoMiniQuiniela
}