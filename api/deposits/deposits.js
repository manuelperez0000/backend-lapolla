const express = require('express')
const router = express.Router()
const { saveDeposit, getDeposits, getOneDeposit, updateDeposit } = require('../../db/controllers/depositController')
const { icreaseUserBalance } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

const validate = require('../../services/validate')

router.get('/', validateToken, async (req, res) => {
    try {
        const response = await getDeposits()
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/save', validateToken, async (req, res) => {

    const data = {
        userId: req.body.userId,
        operationRef: req.body.operationRef,
        amount: req.body.amount,
        adminMethodId: req.body.adminMethodId,
        adminMethod: req.body.adminMethodId
    }

    try {
        validate.required(data.userId, "Error: id de usurio es requerido")
        validate.required(data.operationRef, "Numero de operacion es requerido")
        validate.required(data.amount, "Error, Debe agregar un monto")
        validate.required(data.adminMethodId, "Error: Debe seleccionar un metodo de pago")

        validate.string([
            data.userId,
            data.operationRef,
            data.adminMethodId])

        validate.number(data.amount)

        const response = await saveDeposit(data)
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.get('/:id', validateToken, async (req, res) => {
    const _id = req.params.id
    try {
        const response = await getOneDeposit(_id)
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/update', validateToken, async (req, res) => {
    try {
        const { _id, status } = req.body

        validate.required(status, "Status es requerido")
        validate.required(status === 2 | status === 3, "Status no valido: " + status)
        validate.required(_id, "id es requerido")
        validate.number(status)

        const response = await updateDeposit({ _id, status })
        const { userId, amount } = await getOneDeposit(_id)
        //sumar el balance al usuario
        await icreaseUserBalance({ _id: userId, balance: amount })

        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router