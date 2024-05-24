const express = require('express')
const router = express.Router()
const { getWithdrawsOfUser } = require('../../db/controllers/withdrawController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

//obtener un retiro por su id
router.get('/:id', validateToken, async (req, res) => {
    const _id = req.params.id
    try {
        const body = await getWithdrawsOfUser(_id)
        let message = "Success"
        if(body.length === 0) message = "No se encontro ningun retiro"
        responser.success({ res, message, body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router

