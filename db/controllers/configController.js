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

const ticketController = {
    saveConfig,
    getConfig,
    updateConfig
}

module.exports = ticketController