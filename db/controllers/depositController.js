const Deposit = require('../models/depositModel')

const saveDeposit = async (depositData) => await Deposit(depositData).save()

const getDeposits = async () => await Deposit.find().populate('adminMethod').sort({ $natural: -1 })

const getDepositsOfUser = async (_id) => await Deposit.find({ userId: _id }).populate('adminMethod').sort({ $natural: -1 })

const getOneDeposit = async (_id) => await Deposit.findOne({ _id }).populate('adminMethod')

const updateDeposit = async ({ _id, status }) => await Deposit.findOneAndUpdate({ _id }, { $set: { status } })

const ticketController = {
    saveDeposit,
    getDeposits,
    getOneDeposit,
    updateDeposit,
    getDepositsOfUser
}

module.exports = ticketController