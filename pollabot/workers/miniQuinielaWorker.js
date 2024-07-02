/* const { finalizarQuiniela } = require('../../db/controllers/quinielaController') */
const { getAyerQuiniela, premioAcumuladoQuiniela } = require('../../db/controllers/quinielaController')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { findTicketsByIdQuiniela } = require('../../db/controllers/ticketController')
const { getGanadores } = require('../../api/animals/animalServices')
const config = require('../../config.json')
const { pagoDeClientes, pagoDeAgencias } = require('./workerServices')
const { setPremioAcumulado } = require('../../db/controllers/configController')
const { getFromTo } = require('../../services/utils')
const { fromMini, toMini } = getFromTo()

const repartirPremiosMiniQuiniela = async () => { //finaliza a las 7pm
    console.log("Repartir premios mini quiniela ejecutado")
    try {
        // 1 obtener la mini quiniela de ayer
        const miniQuinielaayer = await getAyerQuiniela(2)
        const animals = await getFilteredAnimals({ from: fromMini, to: toMini })
        const ticketsFindedMini = await findTicketsByIdQuiniela(miniQuinielaayer._id)
        const ganadores4 = getGanadores({ aciertos: 4, animals, ticketsFinded: ticketsFindedMini })
        const premioTotal = config.precioMiniQuiniela * ticketsFindedMini.length * config.porcentajePremio

        if (ganadores4.length > 0) {

            const premio = premioTotal / ganadores4.length
            console.log("el premio es ", premio)

            console.log("total ganadores mini quiniela: ", ganadores4.length)

            ganadores4.forEach(ticket => {
                if (ticket.user.level === 5) pagoDeClientes(ticket, premio)
                if (ticket.user.level === 4) pagoDeAgencias(ticket, premio)
            })

        } else {
            console.log("No hubo ganadores")
            //si no se consigue ganador: acumular premio
            setPremioAcumulado(premioTotal, 2)
            premioAcumuladoQuiniela(miniQuinielaayer._id, premioTotal)
        }


    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    repartirPremiosMiniQuiniela
}