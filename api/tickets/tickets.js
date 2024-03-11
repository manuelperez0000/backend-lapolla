//registro de ticket
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { saveTicket } = require('../../db/controllers/ticketController')

router.post('/', async (req, res) => {

    const { animals, user, type } = req.body

    const ticket = {
        user,
        quinielaType: type,
        animals
    }

    try {
        const body = await saveTicket(ticket)
        if (!body) throw 'Error al guardar en ticket en la db'

        responser.success({ res, message: "success", body })

    } catch (error) {
        console.log(error)
        responser.error({ res, message: error.message || error })
    }
})


module.exports = router;