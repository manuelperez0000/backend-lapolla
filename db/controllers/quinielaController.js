const quinielaModel = require('../models/quinielaModel')

const saveQuiniela = async (quiniela) => await quinielaModel(quiniela).save()

const getQuinielas = async () => await quinielaModel.find()

const updateGranQuiniela = async ({ _id, winners, resultAnimals }) => {
    return await quinielaModel.findOneAndUpdate({ _id }, { $set: { winners, resultAnimals } })
}

const quinielaController = {
    saveQuiniela,
    getQuinielas,
    updateGranQuiniela
}

module.exports = quinielaController