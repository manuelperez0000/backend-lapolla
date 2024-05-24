const Withdraw = require('../models/withdrawModel')

const getWithdraws = async () => await Withdraw.find().sort({ $natural: -1 })

const saveWithdraw = async (data) => await Withdraw(data).save()

const aproveWithdraw = async (_id) => await Withdraw.findOneAndUpdate({ _id }, { state: 2 })

const getWithdraw = async (_id) => await Withdraw.findOne({ _id })

const getWithdrawsOfUser = async (_id) => await Withdraw.find({ userId: _id }).sort({ $natural: -1 })

const withdrawController = {
    getWithdraws,
    saveWithdraw,
    aproveWithdraw,
    getWithdraw,
    getWithdrawsOfUser
}
module.exports = withdrawController