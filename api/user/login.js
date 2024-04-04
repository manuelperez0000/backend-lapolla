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

        const inicio = performance.now();

        const _userData = findOneUsersWhitEmailAndPassword(email, password)
        const _config = getConfig()
        const _payMethods = getMethods()

        const [userData, config, payMethods] = await Promise.all([_userData, _config, _payMethods])

        const fin = performance.now();

        const tiempo_transcurrido = fin - inicio;

        console.log(`Tiempo de ejecución: ${tiempo_transcurrido.toFixed(6)} milisegundos`);

        if (!userData) { throw "Usuario o contraseña incorrecta" }

        const body = jwt.sign({ userData, config, payMethods }, DATA_TOKEN, { expiresIn: '100d' })
        responser.success({ res, message: "Success", body })

    } catch (error) { responser.error({ res, message: error }) }
})

module.exports = router;