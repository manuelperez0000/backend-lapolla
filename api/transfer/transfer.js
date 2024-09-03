const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const { getSendTransfersById, getRecibeTransfersById, approveTransfer, declineTransfer, getTransferById } = require('./transferService')
const { icreaseUserBalance } = require('../../db/controllers/userController')

router.get('/send/:id', validateToken, async (req, res) => {
    try {
        const id = req.params.id
        const body = await getSendTransfersById(id)
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/recibe/:id', validateToken, async (req, res) => {
    try {
        const id = req.params.id
        const body = await getRecibeTransfersById(id)
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.put('/approve/:id', validateToken, async (req, res) => {
    try {
        const id = req.params.id
        //obtener transferencia
        const transferData = await getTransferById(id)

       /*  console.log("transferData: ", transferData) */
        const saldo = transferData.amount

        const { amount, from, to } = transferData
        /* console.log("Saldo: ", saldo) */

        //quitar saldo al grupero 
        await icreaseUserBalance({ _id: to, balance: -amount })
        //agregar saldo a la agencia
        await icreaseUserBalance({ _id: from, balance: amount })

        const body = await approveTransfer(id)
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.put('/decline/:id', validateToken, async (req, res) => {
    try {
        const id = req.params.id
        const body = await declineTransfer(id)
        responser.success({ res, message: 'success', body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;