//creacion de un banco
const express = require('express')
const router = express.Router()
const { success, error } = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const { required, objectEmpty } = require('../../services/validate')
const { savePago, getPaydQuinielas ,getPaydQuinielasTo} = require('./pagoService')

router.post('/', validateToken, async (req, res) => {
    try {
        required(!objectEmpty(req.body), "Peticion invalida")
        const response = await savePago(req.body)
        required(response, "Ocurrio un error al realizar el pago")
        success({ res, body: response, message: "Agregado con exito" })

    } catch (err) {
        error({ res, message: err?.message || err })
    }
})

router.get('/from', validateToken, async (req, res) => {
    try {
        const user = res.user.user
        const body = await getPaydQuinielas(user._id)
        success({ res, body, message: "Agregado con exito" })
    } catch (err) {
        error({ res, message: err?.message || err })
    }
})

router.get('/to', validateToken, async (req, res) => {
    try {
        const user = res.user.user
        const body = await getPaydQuinielasTo(user._id)
        success({ res, body, message: "Agregado con exito" })
    } catch (err) {
        error({ res, message: err?.message || err })
    }
})

module.exports = router;