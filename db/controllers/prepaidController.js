const User = require('../models/userModel')

const setPrepaid = async ({ _id, state }) => await User.findOneAndUpdate({ _id }, { $set: { prepaid: state } })

const userControllers = {
    setPrepaid
}

module.exports = userControllers;