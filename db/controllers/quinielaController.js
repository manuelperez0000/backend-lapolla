const quinielaModel = require('../models/quinielaModel')
const { getHoyCompletedString, getAyerCompletedString, getFromTo } = require('../../services/utils')

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
    const fechaQuiniela = getAyerCompletedString()
//*************************************************************************************************** */
//**********************************MAL ************************************************************ */
//*************************************************************************************************** */
    console.log("tipoQuiniela: ",tipoQuiniela)
    console.log("fechaQuiniela: ",fechaQuiniela)
    const res = await quinielaModel.findOne({ status: true, tipoQuiniela, fechaQuiniela }).sort({ $natural: -1 })
    console.log("res: ",res)
    return res
}

const getAyerQuiniela = async (tipo = 1) => {
    const fechaQuiniela = getAyerCompletedString()

    const response = await quinielaModel.findOne({ fechaQuiniela, tipoQuiniela: tipo })
    if (response) {
        return {
            fechaQuinielaAyer: fechaQuiniela,
            resultFindOneQuiniela: response
        }
    } else {
        return {
            fechaQuinielaAyer : fechaQuiniela,
            resultFindOneQuiniela: null
        }
    }
}

const updateAndFinally = async (_id, winners, resultAnimals, ganadores5Asiertos, ganadores6Asiertos, acumulado) => {
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

const getHoyMiniQuiniela = async () => {
    const { from, to } = getFromTo()
    return await quinielaModel.findOne({ fechaQuiniela: { "$gte": from, "$lt": to } })
}

const premioAcumuladoQuiniela = async (_id, acumulado) => await quinielaModel.findOneAndUpdate({ _id }, { acumulado })

const getQuinielaByDate = async (from, to) => await quinielaModel.find({ fechaQuiniela: { $gt: from, $lt: to } })

const updateAnimals = async ({ _id, resultAnimals }) => {
    if (_id && resultAnimals.length > 0) {
        return await quinielaModel.findOneAndUpdate({ _id }, { resultAnimals })
    }
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
    getAyerQuiniela,
    updateAndFinally,
    getHoyMiniQuiniela,
    premioAcumuladoQuiniela,
    getQuinielaByDate,
    updateAnimals
}

module.exports = quinielaController