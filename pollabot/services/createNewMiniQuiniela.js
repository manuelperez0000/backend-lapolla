const { getConfig } = require("../../db/controllers/configController")
const { countDocuments, getQuinielas, saveQuiniela, getAyerQuiniela, finalizarQuiniela,getHoyMiniQuiniela } = require("../../db/controllers/quinielaController")
const { getAyerYhoy } = require("../utils")
const config = require('../../config.json')
/* const { required } = require("../../services/validate") */
const { fechaHoy } = getAyerYhoy()

exports.closeMiniQuiniela = async ()=>{

    const miniQuiniela = getHoyMiniQuiniela()
    
    const resultCerrarMini = await finalizarQuiniela(miniQuiniela?._id)

    console.log("Cerrar mini quiniela ultima")

    return resultCerrarMini
}

exports.createNewMiniQuiniela2 = async () => {

    let objResult = {}

    //cerrar miniQuiniela de ayer

    const miniQuinielaAyer = await getAyerQuiniela(2)

    objResult.miniQuinielaAyer = miniQuinielaAyer


    const resultDesactivar = await finalizarQuiniela(miniQuinielaAyer?._id)

    objResult.resultDesactivar = resultDesactivar


    const resultGetConfig = await getConfig()

    const { premioCasa, precioMiniQuiniela } = resultGetConfig

    objResult.getConfig = resultGetConfig

    const count = await countDocuments()

    objResult.cantidadDeQuinielas = count

    const data = {
        precioQuiniela: precioMiniQuiniela,
        horaDeLanzamiento: config.horaMiniQuiniela,
        tipoQuiniela: 2,
        porcentajePremio: premioCasa,
        fechaQuiniela: fechaHoy,
        count,
    }

    const miniQuinielaDeHoy = await getQuinielas({ fechaQuiniela: fechaHoy, tipoQuiniela: 2 })

    objResult.miniQuinielaDeHoy = miniQuinielaDeHoy

    //si la fecha de gran quiniela es ayer continua sino retorna falso

    const nuevaMiniQuiniela = miniQuinielaDeHoy.length === 0 && await saveQuiniela(data)

    objResult.nuevaMiniQuiniela = nuevaMiniQuiniela

    return objResult
}