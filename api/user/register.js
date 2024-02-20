//registro de usuarios
const express = require('express')
const router = express.Router()
const { saveUser, findOneUsersWhitEmail } = require('../../db/controllers')
const responser = require('../../network/response')

router.post('/', async (req, res) => {
    const user = req.body

    try {
        const userToRegister = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
            level: 4
        }

        const registeredUser = await findOneUsersWhitEmail(userToRegister.email)

        if (registeredUser) throw "Este correo ya se encuentra registrado"

        const userSaved = await saveUser(userToRegister)

        if (!userSaved) throw "Error al registrar"

        responser.success({ res, message: error, body: userSaved })

    } catch (error) { responser.error({ res, message: error }) }

})

module.exports = router;