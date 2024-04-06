const getAyerYhoy = () => {
    const date = new Date()
    const ayer = new Date()
    const antier = new Date()

    ayer.setDate(ayer.getDate() - 1)
    antier.setDate(antier.getDate() - 2)

    let fechaHoy = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    let fechaAyer = `${ayer.getFullYear()}-${String(ayer.getMonth() + 1).padStart(2, '0')}-${String(ayer.getDate()).padStart(2, '0')}`
    let fechaAntier = `${antier.getFullYear()}-${String(antier.getMonth() + 1).padStart(2, '0')}-${String(antier.getDate()).padStart(2, '0')}`

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

    const ayer = `${fechaAyer.getFullYear()}-${String(fechaAyer.getMonth() + 1).padStart(2, '0')}-${String(fechaAyer.getDate()).padStart(2, '0')} 09:00:00`
    const antier = `${fechaAntier.getFullYear()}-${String(fechaAntier.getMonth() + 1).padStart(2, '0')}-${String(fechaAntier.getDate()).padStart(2, '0')} 09:00:00`

    return {
        ayer,
        antier
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

const utils = {
    getAyerYhoy,
    ayerYantier,
    granQuiniela,
    filterDate
}

module.exports = utils