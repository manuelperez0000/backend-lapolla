const TipoDeCambio = require('../models/tipoDeCambio')

const saveChangeType = async (data) => await TipoDeCambio(data).save()

const getChangeType = async () => await TipoDeCambio.find().limit(200).sort({ $natural: -1 })

const tipoDeCambioController = {
    saveChangeType,
    getChangeType
}

module.exports = tipoDeCambioController