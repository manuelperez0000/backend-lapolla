//obtener un usuario por id
const express = require('express')
const router = express.Router()
const { getUser } = require('../../db/controllers/userController')
const validateToken = require('../../midelwares/validateToken')
const responser = require('../../network/response')
const cors = require('cors')
router.get('/:id', cors(), validateToken, async (req, res) => {

    const _id = req.params.id
    try {
        const body = await getUser({ _id })

        if (!body) throw 'Usuario no encontrado'

        responser.success({ res, message: 'success', body })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router;