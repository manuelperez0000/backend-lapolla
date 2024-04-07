const configModel = require('../models/configModel')



const saveConfig = async () => await configModel().save()

const configId = '6605c4d1f867d9fa9e7d161b'
const getConfig = async () => await configModel.findOne({ _id: configId })

const updateConfig = async (update) => await configModel.findOneAndUpdate({ _id }, { $set: update })

const ticketController = {
    saveConfig,
    getConfig,
    updateConfig
}

module.exports = ticketController