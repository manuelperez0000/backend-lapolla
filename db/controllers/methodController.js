const Method = require('../models/methodsModel')

const saveMethod = async (method) => {
    const response = await Method(method).save()
    return response
}

const getMethods = async () => {
    const response = await Method.find()
    return response
}

const deleteMethod = async (_id) => {
    const response = await Method.deleteOne({ _id })
    return response
}

const MethodControllers = {
    saveMethod,
    getMethods,
    deleteMethod
}

module.exports = MethodControllers;