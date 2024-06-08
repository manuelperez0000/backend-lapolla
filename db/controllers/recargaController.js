const Recarga = require('../models/recargaModel')

const saveRecarga = async (data) => await Recarga(data).save()

const findRecargas = async (data) => await Recarga.find(data).sort({ $natural: -1 }).populate('from').populate('to')

const findRecargasById = async ({_id}) => await Recarga.find({from:_id}).sort({ $natural: -1 }).populate('from').populate('to')

const passControllers = {
    saveRecarga,
    findRecargas,
    findRecargasById
}

module.exports = passControllers;