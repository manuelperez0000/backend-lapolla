const express = require('express')
const router = express.Router()
const { saveDeposit, getDeposits, getOneDeposit, updateDeposit } = require('../../db/controllers/depositController')
const { icreaseUserBalance } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

const validate = require('../../services/validate')

router.get('/', async (req, res) => {
    try {
        const response = await getDeposits()
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/save', async (req, res) => {

    const data = {
        userId: req.body.userId,
        adminMethodId: req.body.adminMethodId,
        operationRef: req.body.operationRef,
        amount: req.body.amount
    }

    try {


        validate.required([
            data.userId,
            data.operationRef,
            data.amount,
            data.adminMethodId])

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


router.get('/:id', async (req, res) => {
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
        const { _id, state } = req.body

        validate.required([_id, state])
        validate.number(state)
        validate.string(_id)

        const response = await updateDeposit({ _id, state })
        const { userId, amount } = await getOneDeposit(_id)
        //sumar el balance al usuario
        await icreaseUserBalance({ _id: userId, balance: amount })

        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router
