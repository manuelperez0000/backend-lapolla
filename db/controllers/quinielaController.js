const quinielaModel = require('../models/quinielaModel')
const { getHoyCompletedString } = require('../../services/utils')

const saveQuiniela = async (quiniela) => await quinielaModel(quiniela).save()

const getQuinielas = async (finded = null) => await quinielaModel.find(finded).sort({ $natural: -1 })

const updateGranQuiniela = async ({ _id, winners, resultAnimals }) => {
    return await quinielaModel.findOneAndUpdate({ _id }, { $set: { winners, resultAnimals } })
}

const getLastActiveQuiniela = async () => {
    return await quinielaModel.findOne({ status: true }).sort({ $natural: -1 })
}

const getLastActiveGranQuiniela = async () => {
    const fechaQuiniela = getHoyCompletedString()
    const res = await quinielaModel.findOne({ status: true, tipoQuiniela: 1, fechaQuiniela }).sort({ $natural: -1 })
    return res
}

const finalizarQuiniela = async (_id) => await quinielaModel.findOneAndUpdate({ _id }, { $set: { status: false } })

const countDocuments = async () => await quinielaModel.countDocuments()

const quinielaController = {
    saveQuiniela,
    getQuinielas,
    updateGranQuiniela,
    getLastActiveQuiniela,
    finalizarQuiniela,
    getLastActiveGranQuiniela,
    countDocuments
}

module.exports = quinielaController