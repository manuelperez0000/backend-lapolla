//registro de ticket
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { saveTicket, getTickets } = require('../../db/controllers/ticketController')

router.post('/', async (req, res) => {

    const { animals, user, type } = req.body
    const actualDate = new Date()
    const dia = actualDate.getDate()
    const mes = actualDate.getMonth() + 1
    const anio = actualDate.getFullYear()
    const hour = actualDate.getHours()
    const minute = actualDate.getMinutes()
    const second = actualDate.getSeconds()
    const hora = `${hour}:${minute}:${second}`
    const date = `${dia}-${mes}-${anio}`;

    const ticket = {
        user,
        quinielaType: type,
        animals,
        date,
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

router.get('/', async (req, res) => {
    const body = await getTickets()
    responser.success({ res, message: "success", body })
})


module.exports = router;