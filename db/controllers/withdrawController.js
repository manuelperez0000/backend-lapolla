const Withdraw = require('../models/withdrawModel')

const getWithdraws = async () => await Withdraw.find().sort({ $natural: -1 })

const saveWithdraw = async (data) => await Withdraw(data).save()

const aproveWithdraw = async (_id) => await Withdraw.findOneAndUpdate({ _id }, { state: 2 })

const getWithdraw = async (_id) => await Withdraw.findOne({ _id })

const withdrawController = {
    getWithdraws,
    saveWithdraw,
    aproveWithdraw,
    getWithdraw
}
module.exports = withdrawController