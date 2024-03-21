//registro de ticket
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { saveTicket, getTickets } = require('../../db/controllers/ticketController')

router.post('/', async (req, res) => {
    process.env.TZ = "America/Caracas"
    const { animals, user, type } = req.body
    const actualDate = new Date()
    const hour = actualDate.getHours()
    const minute = actualDate.getMinutes()
    const second = actualDate.getSeconds()
    const hora = `${hour}:${minute}:${second}`

    const ticket = {
        user,
        quinielaType: type,
        animals,
        hora
    }

    try {
        const body = await saveTicket(ticket)
        if (!body) throw 'Error al guardar en ticket en la db'

        responser.success({ res, message: "success", body })

    } catch (error) {
        console.log(error)
        responser.error({ res, message: error })
    }
})

router.get('/:from/:to', async (req, res) => {
    const { from, to } = req.params

    const newFrom = from + "T00:00:00.000+00:00";
    const newTo = to + "T23:59:59.000+00:00";
    const dateFrom = new Date(newFrom)
    const dateTo = new Date(newTo)

    try {

        const body = await getTickets({ from: newFrom, to: newTo })

        responser.success({ res, message: "success", body })
    } catch (error) {
        console.log(error)
        responser.error({ res, message: error })
    }

})



module.exports = router;