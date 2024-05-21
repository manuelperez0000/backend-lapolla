const Deposit = require('../models/depositModel')

const saveDeposit = async (depositData) => await Deposit(depositData).save()

const getDeposits = async () => await Deposit.find().populate('adminMethod').exec()

const getDepositsOfUser = async (_id) => await Deposit.find({ userId: _id }).populate('adminMethod').exec()

const getOneDeposit = async (_id) => await Deposit.findOne({ _id })

const updateDeposit = async ({ _id, status }) => await Deposit.findOneAndUpdate({ _id }, { $set: { status } })

const ticketController = {
    saveDeposit,
    getDeposits,
    getOneDeposit,
    updateDeposit,
    getDepositsOfUser
}

module.exports = ticketController