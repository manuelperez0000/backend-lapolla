const express = require('express')
const router = express.Router()
const { required } = require('../../services/validate')
const { getPollas } = require('./controller')
const responser = require('../../network/response')

router.get('/', async (req, res) => {
    try {
        const response = await getPollas()
        required([response.mini >= 0, response.gran >= 0], "Error en el servidor, no se encontraron resultados para las pollas del dia")
        responser.success({ res, message: "success", body: { mini: response.mini, gran: response.gran } })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;