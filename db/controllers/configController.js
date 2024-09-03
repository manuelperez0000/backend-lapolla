const { number } = require('../../services/validate')
const configModel = require('../models/configModel')

const saveConfig = async () => await configModel().save({
    "premioCasa": 80,
    "precioGranQuiniela": 25,
    "precioMiniQuiniela": 25,
    "date": "2024-03-28T19:28:17.452+00:00",
    "__v": 0,
    "premioAcumuladoMini": 0,
    "premioAcumuladoGran": 0,
    "horasMiniQuiniela": [
        3,
        7
    ],
    "horaGranQuiniela": "09:00"
})

const configId = '66d60aab0121c22220430389'

const getConfig = async () => {
    const consulta = await configModel.find()
    if (consulta && consulta?.length > 0) {
        return consulta[0]
    } else {
        return false
    }
}

const updateConfig = async (update) => await configModel.findOneAndUpdate({ _id: configId }, { $set: update })

const setPremioAcumulado = async (saldo, tipoQuiniela) => {
    try {
        number(saldo, "Debe ser un numero")
        if (tipoQuiniela === 1) return await configModel.findOneAndUpdate({ _id: configId }, { $inc: { premioAcumuladoMini: saldo } })
        if (tipoQuiniela === 2) return await configModel.findOneAndUpdate({ _id: configId }, { $inc: { premioAcumuladoGran: saldo } })
    } catch (error) {
        /* console.log(error) */
    }
    return null
}

const ticketController = {
    saveConfig,
    getConfig,
    updateConfig,
    setPremioAcumulado
}

module.exports = ticketController