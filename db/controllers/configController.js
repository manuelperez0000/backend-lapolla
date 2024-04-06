const configModel = require('../models/configModel')



const saveConfig = async () => await configModel().save()

const getConfig = async (_id) => await configModel.findOne({ _id })

const updateConfig = async (update) => await configModel.findOneAndUpdate({ _id }, { $set: update })

const ticketController = {
    saveConfig,
    getConfig,
    updateConfig
}

module.exports = ticketController