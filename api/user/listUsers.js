//listar todos los usuarios
const express = require('express')
const router = express.Router()
const { findUsers } = require('../../db/controllers')
const validateToken = require('../../midelwares/validateToken')
const responser = require('../../network/response')
const cors = require('cors')
router.get('/', cors(), validateToken, async (req, res) => {

    try {
        const body = await findUsers()

        if (!body) throw 'Usuarios no encontrado'

        responser.success({ res, message: 'success', body })

    } catch (error) {
        responser.error({ res, message: 'Ocurrio un error de comunicacion con la base de datos' })
    }
})

module.exports = router;