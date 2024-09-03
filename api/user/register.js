/* eslint-disable no-async-promise-executor */
//registro de usuarios
const express = require('express')
const router = express.Router()
const { saveUser, findOneUser } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const validateUserType = require('../../midelwares/validateUserType')
const cors = require('cors')
const { string } = require('../../services/validate')

router.post('/', cors(), validateUserType, async (req, res) => {
    const user = res?.user
    const { name, email, phone, password, ci, level, percent } = req.body
    try {
        if (!name) throw 'El nombre es requerido'
        if (!ci) throw 'La cedula es requerido'
        if (!email) throw 'El email es requerido'
        if (!phone) throw 'El telefono es requerido'
        if (!password) throw 'La contraseña es requerida'
        if (password.length < 6) throw 'La contraseña debe tener un minimo de 6 caracteres'
        if (level > 5) throw 'Debe indicar un tipo de usuario'

        string([name, ci, email, phone, password])

        const userToRegister = { name, email, phone, password, level, ci, percent }
        /* console.log("user: ", user) */

        if (user?.level === 1) userToRegister.admin = user._id
        if (user?.level === 2) userToRegister.admin = user._id
        if (user?.level === 3) userToRegister.grupero = user._id
        if (user?.level === 4) throw "Las agencias no tienen permiso de registrar nuevos usuarios"

        const registeredUser = new Promise(async (resolve, reject) => {
            const res = await findOneUser({ email })
            if (res) reject("Este correo ya se encuentra registrado")
            resolve()
        })

        const registeredCI = new Promise(async (resolve, reject) => {
            const res = await findOneUser({ ci })
            if (res) reject("Esta cedula ya se encuentra registrada")
            resolve()
        })

        await Promise.all([registeredUser, registeredCI])

        const userSaved = await saveUser(userToRegister)

        if (!userSaved) throw "Error al registrar el usuario"

       /*  console.log(userSaved) */

        responser.success({ res, message: 'success', body: userSaved })

    } catch (error) {
        /* console.log(error) */
        responser.error({ res, message: error?.message || error })
    }

})

module.exports = router;

