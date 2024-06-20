const { getQuinielas, saveQuiniela, countDocuments } = require('../../db/controllers/quinielaController')
const { getAyerYhoy } = require('../../pollabot/utils')
const { getConfig } = require('../../db/controllers/configController')
const validate = require('../../services/validate')
const config = require('../../config.json')

const createNewQuiniela = async (tipoQuiniela) => {
    const { fechaHoy } = getAyerYhoy()
    const { premioCasa, precioGranQuiniela, precioMiniQuiniela } = await getConfig()
    const count = await countDocuments()
    const data = {
        precioQuiniela: tipoQuiniela === 1 ? precioGranQuiniela : precioMiniQuiniela,
        horaDeLanzamiento: tipoQuiniela === 1 ? config.horaGranQuiniela : config.horaMiniQuiniela,
        tipoQuiniela,
        porcentajePremio: premioCasa,
        fechaQuiniela: fechaHoy,
        count,
    }

    //obtener una gran quiniela con la fecha de hoy
    const quinielasDeHoy = await getQuinielas({ fechaQuiniela: fechaHoy, tipoQuiniela })
 
    //comprobar si ya esta activa la gran quiniela de hoy
    //si la fecha de gran quiniela es ayer continua sino retorna falso
    if (quinielasDeHoy.length === 0) {
        console.log("No hay quinielas hoy, creando nueva")
        const result = await saveQuiniela(data)
        validate.required(result, "No se pudo crear la gran quiniela")
        return result
    } else {
        console.log("Ya existe una quiniela para hoy")
        return {}
    }
}


module.exports = createNewQuiniela