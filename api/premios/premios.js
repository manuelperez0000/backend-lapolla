const express = require('express')
const router = express.Router()
const { required, isMongoId } = require('../../services/validate')
const validateToken = require('../../midelwares/validateToken')
const { getPremio, getPremios, updatePremio, updatePremioRef } = require('../../db/controllers/premioController')
const responser = require('../../network/response')

router.get('/:id', validateToken, async (req, res) => {
    try {
        const _id = req.params.id
        isMongoId(_id, "Id Invalido")
        const body = await getPremio(_id)
        required(body, "Id invalido")
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/', validateToken, async (req, res) => {
    try {
        const body = await getPremios(req.params.id)
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.put('/', validateToken, async (req, res) => {
    try {
        const { premio } = req.body
        required(premio?._id, "Error, datos incorrectos")
        const body = await updatePremio(premio)
        responser.success({ res, message: "Actualizado correctamente", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.put('/ref', validateToken, async (req, res) => {
    try {
        const payerId = res?.user?.user?._id
        const { ref, _id } = req.body
        required(ref, "Error, Referencia Invalida")
        required(_id, "Error, ID invalido")
        required(payerId, "Error, Pagador Invalido")
        const body = await updatePremioRef({ ref, _id, payerId })
        responser.success({ res, message: "Actualizado correctamente", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;