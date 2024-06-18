const { number } = require('../../services/validate')
const configModel = require('../models/configModel')

const saveConfig = async () => await configModel().save()

const configId = '6605c4d1f867d9fa9e7d161b'

const getConfig = async () => {
    try {
        return await configModel.findOne({ _id: configId })
    } catch (error) {
        return false
    }
}

const updateConfig = async (update) => await configModel.findOneAndUpdate({ _id: configId }, { $set: update })

const setPremioAcumuladoGran = async (saldo) => {
    try {
        number(saldo, "Debe ser un numero")
        return await configModel.findOneAndUpdate({ _id: configId }, { $inc: { premioAcumuladoGran: saldo } })
    } catch (error) {
        console.log(error)
    }
    return null
}

const setPremioAcumuladoMini = async (saldo) => {
    try {
        number(saldo, "Debe ser un numero")
        return await configModel.findOneAndUpdate({ _id: configId }, { $inc: { premioAcumuladoMini: saldo } })
    } catch (error) {
        console.log(error)
    }
    return null
}

const ticketController = {
    saveConfig,
    getConfig,
    updateConfig,
    setPremioAcumuladoGran,
    setPremioAcumuladoMini
}

module.exports = ticketController