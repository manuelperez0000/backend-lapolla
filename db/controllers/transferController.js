const Transfer = require('../models/transfer');

const saveTransfer = async (data) => await Transfer(data).save()

const getTransfers = async () => await Transfer.find().sort({ $natural: -1 })

const approve = async (_id, status) => await Transfer.findOneAndUpdate({ _id }, { status })

const getTransfer = async (_id) => await Transfer.findOne({ _id })

const getSendTransfers = async (_id) => await Transfer.find({ from: _id }).sort({ $natural: -1 }).populate('to').populate('payMethod')

const getRecibeTransfers = async (_id) => await Transfer.find({ to: _id }).sort({ $natural: -1 }).populate('from').populate('payMethod')

const getAllTransfers = async (_id) => await Transfer.find({ $or: [{ from: _id }, { to: _id }] },).sort({ $natural: -1 })

const transferController = {
    getTransfers,
    saveTransfer,
    approve,
    getTransfer,
    getSendTransfers,
    getRecibeTransfers,
    getAllTransfers
}
module.exports = transferController