const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const { required } = require('../../services/validate')
const { icreaseUserBalance, getUser } = require('../../db/controllers/userController')
const { saveRecarga, findRecargas,findRecargasById } = require('../../db/controllers/recargaController')

router.post('/', validateToken, async (req, res) => {
    try {
        const idUserFrom = res.user.user._id
        const idUserTo = req.body._id
        const amount = req.body.amount

        required([idUserFrom, idUserTo, amount])

        //obtener saldo del usuario
        const userData = await getUser(idUserFrom)
        required([userData, userData.balance >= amount], "Saldo insuficiente")

        const response1 = await icreaseUserBalance({ _id: idUserFrom, balance: -amount })
        required(response1, "Ocurrio un error al intentar restar el saldo")
        const response2 = await icreaseUserBalance({ _id: idUserTo, balance: amount })
        required(response2, "Ocurrio un error al intentar sumar el saldo")

        //guardar la transaccion
        const recargaData = {
            from: idUserFrom,
            to: idUserTo,
            amount
        }

        const saveResponse = await saveRecarga(recargaData)
        required(saveResponse, "Error saving")

        const body = {
            from: response1,
            to: response2,
            saved: saveResponse
        }

        responser.success({ res, message: "Recarga Exitosa", body })
    } catch (error) {
        console.log(error)

        responser.error({ res, message: error?.message || error })
    }
})

router.get('/', validateToken, async (_req, res) => {
    try {
        const body = await findRecargas()
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/:id', validateToken, async (req, res) => {
    try {
        const _id = req.params.id
        const body = await findRecargasById({ _id })
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;