//listar todos los usuarios
const express = require('express')
const router = express.Router()
const { findUsers } = require('../../db/controllers/userController')
const validateToken = require('../../midelwares/validateToken')
const responser = require('../../network/response')

router.get('/', validateToken, async (_req, res) => {
    try {
        const user = res.user.user
        const body = await findUsers(user)
        if (!body) throw 'Usuarios no encontrado'
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

/* router.get('/', async (_req, res) => {
    try {
        const body = await findUsers()
        if (!body) throw 'Usuarios no encontrado'
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
}) */

module.exports = router;