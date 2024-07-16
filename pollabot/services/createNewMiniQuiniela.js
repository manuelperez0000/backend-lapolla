const { getConfig } = require("../../db/controllers/configController")
const { countDocuments, getQuinielas, saveQuiniela, getAyerQuiniela, finalizarQuiniela } = require("../../db/controllers/quinielaController")
const { getAyerYhoy } = require("../utils")
const config = require('../../config.json')
const { required } = require("../../services/validate")
const { fechaHoy } = getAyerYhoy()

exports.createNewMiniQuiniela2 = async () => {


    //cerrar miniQuiniela de ayer

    const miniQuinielaAyer = await getAyerQuiniela(2)

    const resultDesactivar = await finalizarQuiniela(miniQuinielaAyer?._id)

    const { premioCasa, precioMiniQuiniela } = await getConfig()
    const count = await countDocuments()
    const data = {
        precioQuiniela: precioMiniQuiniela,
        horaDeLanzamiento: config.horaMiniQuiniela,
        tipoQuiniela: 2,
        porcentajePremio: premioCasa,
        fechaQuiniela: fechaHoy,
        count,
    }

    const miniQuinielaDeHoy = await getQuinielas({ fechaQuiniela: fechaHoy, tipoQuiniela: 2 })

    //si la fecha de gran quiniela es ayer continua sino retorna falso

    const nuevaMiniQuiniela = miniQuinielaDeHoy.length === 0 & await saveQuiniela(data)

    const resultObjects = {
        resultDesactivar,
        nuevaMiniQuiniela
    }

    return resultObjects
}