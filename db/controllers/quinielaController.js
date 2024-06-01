const quinielaModel = require('../models/quinielaModel')

const saveQuiniela = async (quiniela) => await quinielaModel(quiniela).save()

const getQuinielas = async (finded = null) => await quinielaModel.find(finded).sort({ $natural: -1 })

const updateGranQuiniela = async ({ _id, winners, resultAnimals }) => {
    return await quinielaModel.findOneAndUpdate({ _id }, { $set: { winners, resultAnimals } })
}

const getLastActiveQuiniela = async () => {
    return await quinielaModel.findOne({ status: true }).sort({ $natural: -1 })
}

const getLastActiveGranQuiniela = async () => {
    const res = await quinielaModel.findOne({ status: true, tipoQuiniela:1 }).sort({ $natural: -1 })
    console.log(res)
    return res
}

const finalizarQuiniela = async (_id) => {
    return quinielaModel.findOneAndUpdate({ _id }, { $set: { status: false } })
}

const quinielaController = {
    saveQuiniela,
    getQuinielas,
    updateGranQuiniela,
    getLastActiveQuiniela,
    finalizarQuiniela,
    getLastActiveGranQuiniela
}

module.exports = quinielaController