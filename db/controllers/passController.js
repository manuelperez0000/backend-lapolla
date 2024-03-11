const temporalPassModel = require('../models/temporalPassModel')

//reset password users
const saveTemporalPass = async ({ email, temporalPass }) => {
    const response = await temporalPassModel({ email, temporalPass }).save()
    return response
}

const findTemporalPass = async ({ email, temporalPass }) => {
    const response = await temporalPassModel.findOne({ email, temporalPass })
    return response
}
const deleteTemporalPass = async ({ email, temporalPass }) => {
    const response = await temporalPassModel.deleteOne({ email, temporalPass })
    return response
}

//aqui deben ir todos los controladores de la db
const passControllers = {
    saveTemporalPass,
    findTemporalPass,
    deleteTemporalPass
}

module.exports = passControllers;