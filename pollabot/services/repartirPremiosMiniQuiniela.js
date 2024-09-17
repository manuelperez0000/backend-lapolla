const { getGanadores } = require("../../api/animals/animalServices")
const { getFilteredAnimals } = require("../../db/controllers/animalsController")
const { getAyerQuiniela, premioAcumuladoQuiniela } = require("../../db/controllers/quinielaController")
const { findTicketsByIdQuiniela } = require("../../db/controllers/ticketController")
const { getFromTo } = require('../../services/utils')
const { fromMini, toMini } = getFromTo()
const config = require('../../config.json')
const { pagoDeClientes, pagoDeAgencias } = require("../workers/workerServices")
const { setPremioAcumulado } = require("../../db/controllers/configController")

exports.repartirPremiosMiniQuiniela = async () => {

    let obj = {}
    // 1 obtener la mini quiniela de ayer
    const miniQuinielaayer = await getAyerQuiniela(2)

    obj.miniQuinielaayers = miniQuinielaayer
    //console.log("miniQuinielaayer:" + miniQuinielaayer)
    if (miniQuinielaayer.resultFindOneQuiniela) {
        const animals = await getFilteredAnimals({ from: fromMini, to: toMini })

        obj.animals = animals
        //required(animals.length !== 0, "No hay animales en este rango de horas")

        const ticketsFindedMini = await findTicketsByIdQuiniela(miniQuinielaayer?._id)

        obj.ticketsFindedMini = ticketsFindedMini
        //required(ticketsFindedMini.lengtt !== 0, "No se encontraron tickets en esta mini quiniela")

        const ganadores4 = getGanadores({ aciertos: 4, animals, ticketsFinded: ticketsFindedMini })

        obj.ganadores4 = ganadores4
        const premioTotal = config.precioMiniQuiniela * ticketsFindedMini.length * config.porcentajePremio

        obj.premioTotal = premioTotal

        if (ganadores4.length > 0) {

            const premio = premioTotal / ganadores4.length

            obj.premio = premio

            ganadores4.forEach(ticket => {
                if (ticket.user.level === 5) pagoDeClientes(ticket, premio)
                if (ticket.user.level === 4) pagoDeAgencias(ticket, premio)
            })

        } else {
 
            setPremioAcumulado(premioTotal, 2)

            premioAcumuladoQuiniela(miniQuinielaayer._id, premioTotal)
        }
    } else {
        obj.result = "No hubo mini quiniela ayer"
    }

    return obj


}