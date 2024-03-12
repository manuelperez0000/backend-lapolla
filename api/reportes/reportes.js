//creacion de un banco
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { getReportes } = require('../../db/controllers/ticketController')
router.get('/agencia/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const reportes = await getReportes({ _id })
        if (!reportes) throw 'No se encontraron reportes para este id'
        responser.success({ res, message: "success", body: reportes })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router;