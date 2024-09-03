const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { getQuinielas, getLastActiveGranQuiniela } = require('../../db/controllers/quinielaController')
/* const { finalizarQuiniela } = require('../../db/controllers/quinielaController') */
const validateToken = require('../../midelwares/validateToken')
const onlyMaster = require('../../midelwares/onlyMaster')
const { to59, winers } = require('../../pollabot/utils')
const { findTicketsByIdQuiniela } = require('../../db/controllers/ticketController')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { icreaseUserBalance } = require('../../db/controllers/userController')
const createNewQuiniela = require('./newQuiniela')

router.get('/', async (req, res) => {
    try {
        const body = await getQuinielas()
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.post('/:tipoQuiniela', validateToken, onlyMaster, async (req, res) => {
    try {
        const tipoQuiniela = req.params.tipoQuiniela
        const response = await createNewQuiniela(tipoQuiniela)
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.put('/', validateToken, onlyMaster, async (_req, res) => {
    try {
        //obtener gran quiniela ultima
        const activeGranQuiniela = await getLastActiveGranQuiniela()

       /*  console.log("fechaquiniela: ", activeGranQuiniela.fechaQuiniela) */

        //await finalizarQuiniela(activeGranQuiniela._id)
        //traer todos los tickets con el id de esta quiniela
        const tickets = await findTicketsByIdQuiniela(activeGranQuiniela._id)
        //obtener los animales para esta quiniela

        /* console.log("cantidad de tickets: ", tickets.length) */
        const fechaMasUnDia = (_fecha) => {
            /* console.log("first fecha:  ", _fecha) */
            _fecha.setDate(_fecha.getDate() + 1)
            _fecha.setHours(_fecha.getHours() + 4)
           /*  console.log("_fecha", _fecha) */
            return _fecha
        }

        const fecha = fechaMasUnDia(activeGranQuiniela.fechaQuiniela)
        const animals = await getFilteredAnimals({ from: fecha, to: to59(fecha) })
        /* console.log("animals:", animals) */
        const newAnimals = animals.map(i => i.animalId)
        /* console.log("newAnimals:", newAnimals) */

        //repartir la plata a los ganadores
        const precioGranQuiniela = activeGranQuiniela.precioQuiniela
        const premioTotal = tickets.length * 0.8 * precioGranQuiniela
        const premio5asiertos = premioTotal * 0.3
        const premio6asiertos = premioTotal * 0.7

        const winnerTickets = winers(tickets, newAnimals)
        //incrementar el saldo de cada ganador
        if (winnerTickets.winers5asiertos.length > 0) {
            const amount5 = premio5asiertos / winnerTickets.winers5asiertos.length
            winnerTickets.winers5asiertos.forEach((ticket) => {
                const userId = ticket.user._id
                icreaseUserBalance({ _id: userId, balance: amount5 })
            })
        }

        if (winnerTickets.winers6asiertos.length > 0) {
            const amount6 = premio6asiertos / winnerTickets.winers6asiertos.length
            winnerTickets.winers6asiertos.forEach((ticket) => {
                const userId = ticket.user._id
                icreaseUserBalance({ _id: userId, balance: amount6 })
            })
        }
        //incrementar el saldo de los staff


      /*   console.log(winnerTickets.winers5asiertos)
        console.log(winnerTickets.winers6asiertos) */

      /*   console.log("premioTotal", premio6asiertos, premio5asiertos) */

        responser.success({ res, message: "Cerrando quinielas", body: {} })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;