const configModel = require('../models/configModel')

const _id = '6605c4d1f867d9fa9e7d161b'

const saveConfig = async () => await configModel().save()

const getConfig = async () => await configModel.find()

const updateConfig = async (update) => await configModel.findOneAndUpdate({ _id }, { $set: update })

const ticketController = {
    saveConfig,
    getConfig,
    updateConfig
}

module.exports = ticketController