const User = require('../models/userModel')

module.exports = async (_id) => await User.findOneAndUpdate({ _id }, { $set: { block: true } })