const quinielaModel = require('../models/quinielaModel')

const saveQuiniela = async (quiniela) => await quinielaModel(quiniela).save()

const getQuinielas = async () => await quinielaModel.find().sort({ $natural: -1 })

const updateGranQuiniela = async ({ _id, winners, resultAnimals }) => {
    return await quinielaModel.findOneAndUpdate({ _id }, { $set: { winners, resultAnimals } })
}

const getLastActiveQuiniela = async () => {
    return quinielaModel.findOne({ status: false }).sort({ $natural: -1 })
}

const finalizarQuiniela = async (_id) => {
    return quinielaModel.findOneAndUpdate({ _id }, { $set: { status: true } })
}

const quinielaController = {
    saveQuiniela,
    getQuinielas,
    updateGranQuiniela,
    getLastActiveQuiniela,
    finalizarQuiniela
}

module.exports = quinielaController