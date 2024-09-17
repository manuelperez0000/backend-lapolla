/* const { icreaseUserBalance } = require("../../db/controllers/userController") */
const config = require('../../config.json')

const isWinner = (ticket, animals, aciertos) => {
    const idsAnimals = animals.map(i => i.animalId)
    let total = 0
    ticket.animals.forEach(animal => {
        if (idsAnimals.includes(animal.id)) {
            total += 1
           /*  console.log("aciertos : " + total) */
        }
    })

    return total === aciertos
}

const getGanadores = ({ aciertos, animals, ticketsFinded }) => {

    /*    console.log("animals getGanadores: " , animals)
    console.log("tickets finded getGanadores: " , ticketsFinded)
 console.log("ticketsFinded.length: " , ticketsFinded)
    console.log("aciertos getGanadores: " , aciertos) */

    if (ticketsFinded.length > 0) {
        const res = ticketsFinded?.filter(ticket => isWinner(ticket, animals, aciertos))
        return res
    } else {
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

const getArrayAnimalsToSave = ({ owner, hora, animalRuletaActiva, _newFecha, animalGranjita, animalLotoActivo }) => {
    return [
        {
            name: animalRuletaActiva.name,
            animalId: animalRuletaActiva.id,
            owner,
            hora,
            fecha: _newFecha,
            roulet: 1
        },
        {
            name: animalGranjita.name,
            animalId: animalGranjita.id,
            owner,
            hora,
            fecha: _newFecha,
            roulet: 2
        },
        {
            name: animalLotoActivo.name,
            animalId: animalLotoActivo.id,
            owner,
            hora,
            fecha: _newFecha,
            roulet: 3
        }
    ]
}

//https://backend-lapolla-production.vercel.app/api/v1/cron/isudhfyLIJDOHFI4654sdsf86JHGJdsfgwer54IUN

module.exports = {
    getGanadores,
    getObjectFormated,
    isWinner,
    getMontoGranQuiniela,
    getMontoMiniQuiniela,
    getArrayAnimalsToSave
}