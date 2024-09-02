const User = require('../models/userModel')

//buscar usuarios
const findUsers = async (user = {level:1}) => {
    if (user.level === 1) return await User.find().populate('admin').populate('grupero').sort("name")
    if (user.level === 2) return await User.find({ level: { $in: [3, 4] }, admin: user._id }).populate('admin').populate('grupero').sort("name")
    if (user.level === 3) return await User.find({ level: 4, grupero: user._id }).populate('admin').populate('grupero').sort("name")

    return false
}

//guardar usuarios
const saveUser = async (userToRegister) => {
    const response = await User(userToRegister).save()
    return response
}

//buscar un usuario con el email
const findOneUsersWhitEmail = async (email) => await User.findOne({ email })

//buscar un usuario con el email y password
const findOneUsersWhitEmailAndPassword = async (email, password) => {
    const response = await User.findOne({ email, password })
    return response
}

const deleteUser = async (_id) => await User.deleteOne({ _id })

const updateUser = async (user) => await User.findOneAndUpdate({ _id: user._id }, { $set: user })

//update only password in user account
const changeUserPassword = async ({ email, password }) => {
    const response = await User.findOneAndUpdate({ email }, { $set: { password } })
    return response
}

const getUser = async (_id) => await User.findOne({ _id })

const getUserByCi = async ({ ci }) => await User.findOne({ ci })

const findOneUser = async (userData) => await User.findOne(userData)

const icreaseUserBalance = async ({ _id, balance }) => await User.findOneAndUpdate({ _id }, { $inc: { balance } })

const validateFatherNoBlock = async ({grupero,admin}) => {
        const userGrupero = await getUser(grupero)
        const userAdmin = await getUser(admin)
        return userAdmin?.block || userGrupero?.block
}

const userControllers = {
    findUsers,
    saveUser,
    findOneUsersWhitEmail,
    findOneUsersWhitEmailAndPassword,
    deleteUser,
    updateUser,
    changeUserPassword,
    findOneUser,
    getUser,
    getUserByCi,
    icreaseUserBalance,
    User,
    validateFatherNoBlock
}

module.exports = userControllers;