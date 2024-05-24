const Method = require('../models/methodsModel')
const { adminId } = require('../../config.json')
const saveMethod = async (method) => {
    const response = await Method(method).save()
    return response
}

const getMethods = async (id) => {
    try {
        if (id) {
            return await Method.find({ userId: id })
        } else {
            return await Method.find()
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

const getMethod = async (id) => await Method.findOne({ _id: id })

const getAdminMethods = async () => {
    const response = await Method.find({ userId: adminId })
    return response
}

const deleteMethod = async (_id) => {
    const response = await Method.findOneAndUpdate({ _id }, { deleted: true })
    return response
}

const MethodControllers = {
    saveMethod,
    getMethods,
    getAdminMethods,
    deleteMethod,
    getMethod
}

module.exports = MethodControllers;