//mongodb controllers

const User = require('./models/userModel')
const temporalPassModel = require('./models/temporalPassModel')
const Method = require('./models/methodsModel')

//buscar usuarios
const findUsers = async () => {
    const response = await User.find()
    return response
}

//guardar usuarios
const saveUser = async (userToRegister) => {
    const response = await User(userToRegister).save()
    return response
}

//buscar un usuario con el email
const findOneUsersWhitEmail = async (email) => {
    const response = await User.findOne({ email })
    return response
}

//buscar un usuario con el email y password
const findOneUsersWhitEmailAndPassword = async (email, password) => {
    const response = await User.findOne({ email, password })
    return response
}

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

//update only password in user account
const changeUserPassword = async ({ email, password }) => {
    const response = await User.findOneAndUpdate({ email }, { $set: { password } })
    return response
}

const deleteUser = async (_id) => await User.deleteOne({ _id })

const updateUser = async (user) => {
    const response = await User.findOneAndUpdate({ _id: user._id }, { $set: user })
    return response
}

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

//aqui deben ir todos los controladores de la db
const controllers = {
    findUsers,
    saveUser,
    findOneUsersWhitEmail,
    findOneUsersWhitEmailAndPassword,
    saveTemporalPass,
    findTemporalPass,
    deleteTemporalPass,
    changeUserPassword,
    deleteUser,
    updateUser,
    saveMethod,
    getMethods,
    deleteMethod
}

module.exports = controllers;