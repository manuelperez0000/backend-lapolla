const { number } = require('../../services/validate')
const configModel = require('../models/configModel')

const saveConfig = async () => await configModel().save()

const configId = '6605c4d1f867d9fa9e7d161b'

const getConfig = async () => await configModel.findOne({ _id: configId })

const updateConfig = async (update) => await configModel.findOneAndUpdate({ _id: configId }, { $set: update })

const setPremioAcumulado = async (saldo, tipoQuiniela) => {
    try {
        number(saldo, "Debe ser un numero")
        if (tipoQuiniela === 1) return await configModel.findOneAndUpdate({ _id: configId }, { $inc: { premioAcumuladoMini: saldo } })
        if (tipoQuiniela === 2) return await configModel.findOneAndUpdate({ _id: configId }, { $inc: { premioAcumuladoGran: saldo } })
    } catch (error) {
        console.log(error)
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