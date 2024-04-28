const Method = require('../models/methodsModel')
const { adminId } = require('../../config.json')
const saveMethod = async (method) => {
    const response = await Method(method).save()
    return response
}

const getMethods = async (id) => {
    const response = await Method.find({ userId: id })
    return response
}

const getAdminMethods = async () => {
    const response = await Method.find({ userId: adminId })
    return response
}

const deleteMethod = async (_id) => {
    const response = await Method.deleteOne({ _id })
    return response
}

const MethodControllers = {
    saveMethod,
    getMethods,
    getAdminMethods,
    deleteMethod
}

module.exports = MethodControllers;