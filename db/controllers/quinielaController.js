const quinielaModel = require('../models/quinielaModel')
const { getHoyCompletedString, getAyerCompletedString } = require('../../services/utils')

const saveQuiniela = async (quiniela) => await quinielaModel(quiniela).save()

const getQuinielas = async (finded = null) => await quinielaModel.find(finded).sort({ $natural: -1 })

const updateGranQuiniela = async ({ _id, winners, resultAnimals }) => {
    return await quinielaModel.findOneAndUpdate({ _id }, { $set: { winners, resultAnimals } })
}

const getLastActiveQuiniela = async () => {
    return await quinielaModel.findOne({ status: true }).sort({ $natural: -1 })
}

const getLastActiveGranQuinielaAndMini = async () => {
    const fechaQuiniela = getAyerCompletedString()
    return await quinielaModel.find({ status: true, fechaQuiniela }).sort({ $natural: -1 })
}

const finalizarQuiniela = async (_id) => await quinielaModel.findOneAndUpdate({ _id }, { $set: { status: false } })

const countDocuments = async () => await quinielaModel.countDocuments()

const getLastActive = async ({ tipoQuiniela }) => {
    const fechaQuiniela = getHoyCompletedString()
    const res = await quinielaModel.findOne({ status: true, tipoQuiniela, fechaQuiniela }).sort({ $natural: -1 })
    return res
}

const getAyerGranQuiniela = async (tipo = 1) => {
    const fechaQuiniela = getAyerCompletedString()
    return await quinielaModel.find({ fechaQuiniela, tipoQuiniela: tipo }).sort({ $natural: -1 })
}

const updateAndFinally = async (_id, winners, resultAnimals, ganadores5Asiertos, ganadores6Asiertos,acumulado) => {
    return await quinielaModel.findByIdAndUpdate({ _id }, {
        $set: {
            status: false, 
            winners,
            resultAnimals, 
            ganadores5Asiertos, 
            ganadores6Asiertos,
            acumulado
        }
    })
}

const quinielaController = {
    saveQuiniela,
    getQuinielas,
    updateGranQuiniela,
    getLastActiveQuiniela,
    finalizarQuiniela,
    getLastActive,
    countDocuments,
    getLastActiveGranQuinielaAndMini,
    getAyerGranQuiniela,
    updateAndFinally
}

module.exports = quinielaController