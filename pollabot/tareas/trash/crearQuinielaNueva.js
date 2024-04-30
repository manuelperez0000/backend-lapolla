const { getTickets } = require('../../../db/controllers/ticketController')
const { getConfig } = require('../../../db/controllers/configController')
const { saveQuiniela } = require('../../../db/controllers/quinielaController')
const { getAyerYhoy } = require('../../utils')

const crearQuinielaNueva = async () => {
    console.log("Creando nueva quiniela")
    try {
        const { fechaHoy } = getAyerYhoy()
        const { premioCasa, horaGranQuiniela, precioGranQuiniela } = await getConfig()
        const resultados = {
            precioQuiniela: precioGranQuiniela,
            horaDeLanzamiento: horaGranQuiniela,
            tipoQuiniela: 1,
            porcentajePremio: premioCasa,
            fechaQuiniela: fechaHoy,
        }
        const quiniela = await saveQuiniela(resultados)
        return quiniela._id
    } catch (error) {
        console.log("Ocurrio un error:", error)
    }
}

module.exports = crearQuinielaNueva
