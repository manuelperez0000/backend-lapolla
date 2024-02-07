//mongodb controllers
const User = require('../api/models/userModel')

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

//aqui deben ir todos los controladores de la db
const controllers = {
    findUsers,
    saveUser,
    findOneUsersWhitEmail,
    findOneUsersWhitEmailAndPassword
}

module.exports = controllers;