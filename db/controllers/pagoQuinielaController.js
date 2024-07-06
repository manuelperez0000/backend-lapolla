const PagoQuiniela = require("../models/pagoQuiniela")

const createPago = async (data) => await PagoQuiniela(data).save()

const getPagos = async (_id) => await PagoQuiniela.find({ idAgencia: _id })
    .sort({ $natural: -1 })
    .populate("idTransfer")

const getPago = async (_id) => await PagoQuiniela.findOne({ _id })


const pagoQuinielaController = {
    createPago,
    getPagos,
    getPago
}

module.exports = pagoQuinielaController