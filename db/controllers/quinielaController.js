const quinielaModel = require('../models/quinielaModel')
const { getAyerCompletedString, getFromTo, getFromToAyerYHoy, getFechasHoyMini } = require('../../services/utils')

const saveQuiniela = async (quiniela) => await quinielaModel(quiniela).save()

const getQuinielas = async (finded = null) => await quinielaModel.find(finded).sort({ $natural: -1 })

const updateGranQuiniela = async ({ _id, winners, resultAnimals }) => {
    return await quinielaModel.findOneAndUpdate({ _id }, { $set: { winners, resultAnimals } })
}

const getLastActiveQuiniela = async () => {
    return await quinielaModel.findOne({ status: true }).sort({ $natural: -1 })
}

const getLastActiveGranQuinielaAndMini = async () => {

    const ayer = new Date();
    const hoy = new Date();
    ayer.setDate(hoy.getDate() - 1);
    const newAyer = ayer.getFullYear() + "-" + String(ayer.getMonth() + 1).padStart(2, '0') + "-" + String(ayer.getDate()).padStart(2, '0') + "T00:00:00.000+00:00"
    const newHoy = hoy.getFullYear() + "-" + String(hoy.getMonth() + 1).padStart(2, '0') + "-" + String(hoy.getDate()).padStart(2, '0') + "T00:00:00.000+00:00"
    const ayerFinal = ayer.getFullYear() + "-" + String(ayer.getMonth() + 1).padStart(2, '0') + "-" + String(ayer.getDate()).padStart(2, '0') + "T23:59:59.000+00:00"

    return await quinielaModel.find({
        $or: [
            { fechaQuiniela: { $gte: newAyer, $lt: ayerFinal }, status: true, tipoQuiniela: 1 },
            { fechaQuiniela: { $gte: newHoy }, status: true, tipoQuiniela: 2 }
        ]
    }).sort({ $natural: -1 })
}



const finalizarQuiniela = async (_id) => {

    //return await quinielaModel.findOneAndUpdate({ _id }, { $set: { status: false } })
    return quinielaModel.updateMany({}, { $set: { status: false } })
}

const countDocuments = async () => await quinielaModel.countDocuments()



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
            fechaQuinielaAyer: fechaQuiniela,
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


const getLastActive = async ({ tipoQuiniela }) => {
    if (tipoQuiniela === 1) {
        return await getLastActiveGranQuiniela()
    } else if (tipoQuiniela === 2) {
        return await getLastActiveMiniQuiniela()
    } else {
        return false
    }
}

const getLastActiveGranQuiniela = async () => {
    const { from, to } = getFromToAyerYHoy()
    const result = await quinielaModel.findOne({ fechaQuiniela: { "$gte": from, "$lt": to }, status: true, tipoQuiniela: 1 })
    return result
}

const getLastActiveMiniQuiniela = async () => {
    const { from, to } = getFechasHoyMini()
    const result = await quinielaModel.findOne({ fechaQuiniela: { "$gte": from, "$lt": to }, status: true, tipoQuiniela: 2 })
    return result
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
    updateAnimals,
    getLastActiveGranQuiniela,
    getLastActiveMiniQuiniela
}

module.exports = quinielaController