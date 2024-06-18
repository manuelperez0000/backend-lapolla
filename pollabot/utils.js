
const getAyerYhoy = () => {
    const date = new Date()
    const ayer = new Date()
    const antier = new Date()

    ayer.setDate(ayer.getDate() - 1)
    ayer.setHours(ayer.getHours() + 4)
    antier.setDate(antier.getDate() - 2)

    const fechaHoy = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const fechaAyer = `${ayer.getFullYear()}-${String(ayer.getMonth() + 1).padStart(2, '0')}-${String(ayer.getDate()).padStart(2, '0')}`
    const fechaAntier = `${antier.getFullYear()}-${String(antier.getMonth() + 1).padStart(2, '0')}-${String(antier.getDate()).padStart(2, '0')}`

    return {
        fechaHoy,
        fechaAyer,
        fechaAntier
    }
}


const ayerYantier = () => {
    const fechaAyer = new Date()
    const fechaAntier = new Date()

    fechaAyer.setDate(fechaAyer.getDate() - 1)
    fechaAntier.setDate(fechaAntier.getDate() - 2)

    const quinielaHour = " 00:00:00"
    const antierHour = " 09:00:00"
    const finalTarde = " 23:59:59"
    const quinielaHourTicket = " 09:00:00"

    const antier = `${fechaAntier.getFullYear()}-${String(fechaAntier.getMonth() + 1).padStart(2, '0')}-${String(fechaAntier.getDate()).padStart(2, '0')}${antierHour}`
    const ayer = `${fechaAyer.getFullYear()}-${String(fechaAyer.getMonth() + 1).padStart(2, '0')}-${String(fechaAyer.getDate()).padStart(2, '0')}${quinielaHour}`
    const ayerTicket = `${fechaAyer.getFullYear()}-${String(fechaAyer.getMonth() + 1).padStart(2, '0')}-${String(fechaAyer.getDate()).padStart(2, '0')}${quinielaHourTicket}`
    const ayerFinalTarde = `${fechaAyer.getFullYear()}-${String(fechaAyer.getMonth() + 1).padStart(2, '0')}-${String(fechaAyer.getDate()).padStart(2, '0')}${finalTarde}`

    return {
        ayer,
        ayerTicket,
        antier,
        ayerFinalTarde
    }
}

const granQuiniela = "1"

const filterDate = (arrayItems, horaGranQuiniela) => {
    return arrayItems.filter((item) => {
        const date = new Date()
        const ticketDate = new Date(item.date)
        const diaDeHoy = date.getDate()
        const ayerDate = new Date()
        ayerDate.setDate(ayerDate.getDate() - 1)
        const diaDeAyer = ayerDate.getDate()
        const horaDelTicket = ticketDate.getHours()
        const diaDelTicket = ticketDate.getDate()

        return diaDelTicket === diaDeAyer && horaDelTicket >= horaGranQuiniela || diaDelTicket === diaDeHoy
    })

}

const getWinnersOrLossers = (_tickets, _animals, win) => {
    return _tickets.filter(ticket => {
        const ticketAnimalIds = ticket.animals.map(animal => animal.id)
        let counter = 0
        ticketAnimalIds.forEach(element => _animals.includes(element) && counter++)
        return win === "winners" ? counter > 4 : counter < 5
    })
}

const winers = (tickets, animals) => {

    const winers5asiertos = []
    const winers6asiertos = []

    tickets.forEach((ticket) => {
        let counter = 0
        const animalIdsTickets = ticket.animals.map(animal => animal.id)
        animalIdsTickets.forEach((animalTicket, index) => {
            console.log("animalFor: ", index, ' - ', animalTicket)
            if (animals.includes(animalTicket)) {
                counter = counter + 1
            }
        })

        console.log("counter", counter)
        if (counter === 6) {
            winers6asiertos.push(ticket)
        } else if (counter === 5) {
            winers5asiertos.push(ticket)
        }
    })

    return {
        winers5asiertos,
        winers6asiertos
    }
}

const to59 = (_date) => {
    const fecha = _date.getFullYear() + "-" + String(_date.getMonth() + 1).padStart(2, '0') + "-" + String(_date.getDate()).padStart(2, "0")
    const newFecha = fecha + "T23:59:59.000+00:00"
    return newFecha
}

const utils = {
    getAyerYhoy,
    ayerYantier,
    granQuiniela,
    filterDate,
    getWinnersOrLossers,
    to59,
    winers

}

module.exports = utils