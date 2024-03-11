//login de usuarios
const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const { DATA_TOKEN } = require('../../services/temporalEnv')
const { findOneUsersWhitEmail, findOneUsersWhitEmailAndPassword } = require('../../db/controllers/userController')
const responser = require('../../network/response')

router.post('/', cors(), async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) { throw 'Se espera un correo y una contraseña' }

        const userFinded = await findOneUsersWhitEmail(email)

        if (!userFinded) { throw "Usuario no registrado" }

        const userData = await findOneUsersWhitEmailAndPassword(email, password)

        if (!userData) { throw "Usuario o contraseña incorrecta" }

        const body = jwt.sign({ userData }, DATA_TOKEN, { expiresIn: '100d' })
        responser.success({ res, body })

    } catch (error) { responser.error({ res, message: error }) }
})

module.exports = router;