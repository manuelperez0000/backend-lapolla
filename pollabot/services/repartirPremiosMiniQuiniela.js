const { getGanadores } = require("../../api/animals/animalServices")
const { getFilteredAnimals } = require("../../db/controllers/animalsController")
const { getAyerQuiniela, premioAcumuladoQuiniela } = require("../../db/controllers/quinielaController")
const { findTicketsByIdQuiniela } = require("../../db/controllers/ticketController")
const { getFromTo } = require('../../services/utils')
const { fromMini, toMini } = getFromTo()
const config = require('../../config.json')
const { pagoDeClientes, pagoDeAgencias } = require("../workers/workerServices")
const { setPremioAcumulado } = require("../../db/controllers/configController")
const { required } = require("../../services/validate")

exports.repartirPremiosMiniQuiniela = async () => {
    console.log("Repartir premios mini quiniela ejecutado")
    try {
        // 1 obtener la mini quiniela de ayer
        const miniQuinielaayer = await getAyerQuiniela(2)
        console.log("miniQuinielaayer:" + miniQuinielaayer)
        if (miniQuinielaayer) {
            const animals = await getFilteredAnimals({ from: fromMini, to: toMini })

            required(animals.length !== 0, "No hay animales en este rango de horas")

            const ticketsFindedMini = await findTicketsByIdQuiniela(miniQuinielaayer?._id)

            required(ticketsFindedMini.lenght !== 0, "No se encontraron tickets en esta mini quiniela" )

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
        } else {
            console.log("No hay mini quiniela de ayer")
        }

    } catch (error) {
        console.log(error)
    }
}