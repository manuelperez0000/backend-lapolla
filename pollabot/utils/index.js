const getAyerYhoy = () => {
    const date = new Date()
    const ayer = new Date()
    ayer.setDate(ayer.getDate() - 1)
    let fechaHoy = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    let fechaAyer = `${ayer.getFullYear()}-${String(ayer.getMonth() + 1).padStart(2, '0')}-${String(ayer.getDate()).padStart(2, '0')}`
    return {
        fechaHoy,
        fechaAyer
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
    granQuiniela,
    filterDate
}

module.exports = utils