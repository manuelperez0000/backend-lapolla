const express = require('express')
const router = express.Router()
const { saveDeposit, getDeposits, getOneDeposit, updateDeposit } = require('../../db/controllers/depositController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

router.get('/', async (req, res) => {
    try {
        const response = await getDeposits()
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})


router.post('/save', async (req, res) => {

    const data = req.body

    try {
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
        if (!_id) throw '_id es requerido'
        if (!state) throw 'state es requerido'

        const response = await updateDeposit({ _id, state })

        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router;