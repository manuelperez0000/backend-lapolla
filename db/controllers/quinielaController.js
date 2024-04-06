const quinielaModel = require('../models/quinielaModel')

const saveQuiniela = async (quiniela) => await quinielaModel(quiniela).save()

const getQuinielas = async () => await quinielaModel.find()

const quinielaController = {
    saveQuiniela,
    getQuinielas
}

module.exports = quinielaController