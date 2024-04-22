const Deposit = require('../models/depositModel')

const saveDeposit = async (depositData) => await Deposit(depositData).save()

const getDeposits = async () => await Deposit.find()

const getOneDeposit = async (_id) => await Deposit.findOne({ _id })

const updateDeposit = async ({ _id, state }) => await Deposit.findOneAndUpdate({ _id }, { $set: { state } })

const ticketController = {
    saveDeposit,
    getDeposits,
    getOneDeposit,
    updateDeposit
}

module.exports = ticketController