const User = require('../models/userModel')

module.exports = async (_id,block) => await User.findOneAndUpdate({ _id }, { $set: { block } })