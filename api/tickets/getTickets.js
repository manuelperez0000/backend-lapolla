//registro de ticket
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { getMyTickets } = require('../../db/controllers/ticketController')

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const body = await getMyTickets(id)
        responser.success({ res, message: "success", body })
    } catch (error) {
        console.log(error)
        responser.error({ res, message: error })
    }
})









module.exports = router;