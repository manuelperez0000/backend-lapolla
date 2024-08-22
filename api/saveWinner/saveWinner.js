//creacion de un banco
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const { savePremio } = require('../../db/controllers/premioController')
const { required } = require('../../services/validate')
router.post('/', validateToken, async (req, res) => {
    try {
        const agencia = res?.user?.user
        const data = req?.body
        const { payMethod, ticket, userData } = data
        required([payMethod, ticket, userData, agencia], "Datos invalidos")

        const premio = { payMethod, ticket, amount: 999, userData, agencia }

        savePremio(premio)

        responser.success({ res, message: "success", body: { userData, data } })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;