const { getConfig } = require("../../db/controllers/configController")
const { countDocuments, getQuinielas, saveQuiniela } = require("../../db/controllers/quinielaController")
const { getAyerYhoy } = require("../utils")
const config = require('../../config.json')
const {required} = require("../../services/validate")

exports.createNewMiniQuiniela2 = async () => {
    console.log("crear mini quiniela ejecutado")
    const { fechaHoy } = getAyerYhoy()
    const { premioCasa, precioMiniQuiniela } = await getConfig()
    const count = await countDocuments()
    const data = {
        precioQuiniela:precioMiniQuiniela,
        horaDeLanzamiento:config.horaMiniQuiniela,
        tipoQuiniela:2,
        porcentajePremio: premioCasa,
        fechaQuiniela: fechaHoy,
        count,
    }

    const miniQuinielaDeHoy = await getQuinielas({ fechaQuiniela: fechaHoy, tipoQuiniela:2 })

    console.log(miniQuinielaDeHoy)
 
    //comprobar si ya esta activa la gran quiniela de hoy
    //si la fecha de gran quiniela es ayer continua sino retorna falso
    if (miniQuinielaDeHoy.length === 0) {
        const result = await saveQuiniela(data)
        required(result, "No se pudo crear la quiniela")
        return result
    } else {
        console.log("Ya existe una quiniela para hoy")
        return false
    }
}