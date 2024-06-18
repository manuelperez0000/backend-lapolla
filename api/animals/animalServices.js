const { required, number } = require("../../services/validate")

const getGanadores = async ({ aciertos, animals = [], ticketsFinded = [] }) => {
    try {
        required([aciertos, animals, ticketsFinded])
        number(aciertos, "Aciertos debe ser un numero")

        const idsAnimals = animals.map(i => i.animalId)
        return ticketsFinded.length > 0 ? ticketsFinded.filter((ticket) => {
            let aciertosAcumulado = 0
            ticket.animals.forEach(animal => {
                if (idsAnimals.includes(animal.id)) aciertosAcumulado = aciertosAcumulado + 1
            })
            return aciertosAcumulado === aciertos ? true : false
        }) : []
    } catch (error) {
        console.log(error)
    }
}

/* const ganadores5aciertos = ticketsGranQuiniela.length > 0 ? ticketsGranQuiniela.filter((ticket) => {
    let aciertos = 0
    ticket.animals.forEach(animal => {
        if (idsAnimals.includes(animal.id)) aciertos = aciertos + 1
    })
    return aciertos === 5 ? true : false
}) : []

const ganadores6aciertos = ticketsGranQuiniela.length > 0 ? ticketsGranQuiniela.filter((ticket) => {
    let aciertos = 0
    ticket.animals.forEach(animal => {
        if (idsAnimals.includes(animal.id)) aciertos = aciertos + 1
    })
    return aciertos === 6 ? true : false
}) : []

const ganadores3aciertos = ticketsMiniQuiniela.length > 0 ? ticketsMiniQuiniela.filter((ticket) => {
    let aciertos = 0
    ticket.animals.forEach(animal => {
        if (idsAnimals.includes(animal.id)) aciertos = aciertos + 1
    })
    return aciertos === 3 ? true : false
}) : [] */

module.exports = {
    getGanadores
}