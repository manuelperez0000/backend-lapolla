const { getQuinielas, saveQuiniela, countDocuments } = require('../../db/controllers/quinielaController')
const { getAyerYhoy } = require('../../pollabot/utils')
const { getConfig } = require('../../db/controllers/configController')
const validate = require('../../services/validate')
const config = require('../../config.json')
const newQuiniela = async () => {
    const { fechaHoy } = getAyerYhoy()
    const { premioCasa,  precioGranQuiniela } = await getConfig()
    const count = await countDocuments()
    const _granQuiniela = {
        precioQuiniela: precioGranQuiniela,
        horaDeLanzamiento: config.horaGranQuiniela,
        tipoQuiniela: 1,
        porcentajePremio: premioCasa,
        fechaQuiniela: fechaHoy,
        count
    }

    const _miniQuiniela = {
        precioQuiniela: precioGranQuiniela,
        horaDeLanzamiento: config.horaMiniQuiniela,
        tipoQuiniela: 2,
        porcentajePremio: premioCasa,
        fechaQuiniela: fechaHoy,
        count
    }

    //comprobar si ya esta activa la gran quiniela de hoy
    //obtener una gran quiniela con la fecha de hoy
    const quinielasDeHoy = await getQuinielas({ fechaQuiniela: fechaHoy })
    const granQuinielasDeHoy = quinielasDeHoy.filter(item => item.tipoQuiniela === 1)
    const miniQuinielasDeHoy = quinielasDeHoy.filter(item => item.tipoQuiniela === 2)

    let granQuiniela = { validated: false }
    let miniQuiniela = { validated: false }

    //si la fecha de gran quiniela es ayer continua sino
    if (granQuinielasDeHoy.length === 0) {
        granQuiniela.validated = true
        granQuiniela.result = await saveQuiniela(_granQuiniela)
        validate.required(granQuiniela, "No se pudo crear la gran quiniela")
    }

    if (miniQuinielasDeHoy.length === 0) {
        miniQuiniela.validated = true
        miniQuiniela.result = await saveQuiniela(_miniQuiniela)
        validate.required(miniQuiniela, "No se pudo crear la mini quiniela")
    }
}


module.exports = newQuiniela