const { getConfig } = require('../../../db/controllers/configController')
const { saveQuiniela } = require('../../../db/controllers/quinielaController')
const { getAyerYhoy } = require('../utils')

const crearQuinielaNueva = async ({ type }) => {
    console.log("Creando nueva quiniela")
    try {

        const tipoQuiniela = type === "granQuiniela" ? 1 : 2

        const { fechaHoy } = getAyerYhoy()
        const { premioCasa, horaGranQuiniela, precioGranQuiniela } = await getConfig()
        const nuevaQuiniela = {
            precioQuiniela: precioGranQuiniela,
            horaDeLanzamiento: horaGranQuiniela,
            tipoQuiniela,
            porcentajePremio: premioCasa,
            fechaQuiniela: fechaHoy,
        }
        const quiniela = await saveQuiniela(nuevaQuiniela)
        return quiniela._id
    } catch (error) {
        console.log("Ocurrio un error:", error)
    }
}

module.exports = crearQuinielaNueva
