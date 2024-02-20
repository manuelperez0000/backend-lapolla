//mongodb controllers

const User = require('./models/userModel')
const temporalPassModel = require('./models/temporalPassModel')

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

const saveTemporalPass = async (email, password) => {
    const response = await temporalPassModel({ email, password }).save()
    return response
}

const findTemporalPass = async (email, password) => {
    const response = await temporalPassModel.findOne({ email, password })
    return response
}
const deleteTemporalPass = async (email, temporalPass) => {
    const response = await temporalPassModel.deleteOne({ email, temporalPass })
    return response
}

//update only password in user account
const changeUserPassword = async (email, password) => {
    const response = await temporalPassModel.findOneAndUpdate({ email }, { password })
    return response
}
const findAllTemporalPasswords = async (email) =>{
    const response = await temporalPassModel.find()
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
    findAllTemporalPasswords
}

module.exports = controllers;