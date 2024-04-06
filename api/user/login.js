//login de usuarios
const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const { DATA_TOKEN } = require('../../services/temporalEnv')
const { findOneUsersWhitEmail, findOneUsersWhitEmailAndPassword } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const { getConfig } = require('../../db/controllers/configController')
const { getMethods } = require('../../db/controllers/methodController')
router.post('/', cors(), async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) { throw 'Se espera un correo y una contraseña' }

        const userFinded = await findOneUsersWhitEmail(email)

        if (!userFinded) { throw "Usuario no registrado" }


        const _userData = findOneUsersWhitEmailAndPassword(email, password)
        const _config = getConfig()
        const _payMethods = getMethods()

        const [userData, config, payMethods] = await Promise.all([_userData, _config, _payMethods])

        if (!userData) { throw "Usuario o contraseña incorrecta" }

        const token = jwt.sign({ userData }, DATA_TOKEN, { expiresIn: '100d' })
        const data = { userData, config, payMethods }
        responser.success({ res, message: "Success", body: { token, data } })

    } catch (error) { responser.error({ res, message: error }) }
})

module.exports = router;