//registro de usuarios
const express = require('express')
const router = express.Router()
const { saveUser, findOneUsersWhitEmail } = require('../../db/controllers')
const responser = require('../../network/response')

router.post('/', async (req, res) => {
    const { name, email, phone, password,ci } = req.body
    try {
        if (!name) throw 'El nombre es requerido'
        if (!ci) throw 'La cedula es requerido'
        if (!email) throw 'El email es requerido'
        if (!phone) throw 'El telefono es requerido'
        if (!password) throw 'La contraseña es requerida'
        if (password.length < 6) throw 'La contraseña debe tener un minimo de 6 caracteres'
        
        const userToRegister = {
            name,
            email,
            phone,
            password,
            level: 4,
            ci
        }

        const registeredUser = await findOneUsersWhitEmail(email)

        if (registeredUser) throw "Este correo ya se encuentra registrado"

        const userSaved = await saveUser(userToRegister)

        if (!userSaved) throw "Error al registrar el usuario"

        responser.success({ res, message: 'success', body: userSaved })

    } catch (error) {
        responser.error({ res, message: error })
    }

})

module.exports = router;

