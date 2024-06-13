//login de usuarios
const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const { DATA_TOKEN } = require('../../services/temporalEnv')
const { findOneUsersWhitEmail, findOneUsersWhitEmailAndPassword } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const { getConfig } = require('../../db/controllers/configController')
const { getMethods, getAdminMethods } = require('../../db/controllers/methodController')
const validate = require('../../services/validate')

router.post('/', cors(), async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) { throw 'Se espera un correo y una contraseña' }

        const userFinded = await findOneUsersWhitEmail(email)


        if (!userFinded) { throw "Usuario no registrado" }

        console.log("userFinded: " + userFinded)

        validate.required(!userFinded.block, "Usuario bloqueado, por favor contactar a su administrador")

        const _userData = await findOneUsersWhitEmailAndPassword(email, password)
        const _config = await getConfig()
        const _adminMethods = await getAdminMethods()

        const [user, config, adminMethods] = await Promise.all([_userData, _config, _adminMethods])

        validate.required(user, "Email o contraseña invalida")

        console.log("user:", user, " conf:", config, " admin methods:", adminMethods)

        const userMethods = await getMethods(user._id)

        if (!user) { throw "Usuario o contraseña incorrecta" }

        const token = jwt.sign({ user }, DATA_TOKEN, { expiresIn: '100d' })

        const userData = {
            _id: user._id,
            name: user.name,
            ci: user.ci,
            email: user.email,
            phone: user.phone,
            level: user.level,
            grupero: user.grupero,
            admin: user.admin,
            percent: user.percent,
            balance: user.balance,
            date: user.date,
            userMethods,
            adminMethods,
            config
        }

        const data = { userData, config, payMethods: userMethods }

        responser.success({ res, message: "Success", body: { token, data } })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;