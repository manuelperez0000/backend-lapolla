/* eslint-disable no-undef */
//registro de ticket
process.env.TZ = "America/Caracas"
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { saveTicket, getTickets, getTicket, countDocuments } = require('../../db/controllers/ticketController')
const { icreaseUserBalance, getUser } = require('../../db/controllers/userController')
const { required } = require('../../services/validate')
const { getLastActiveGranQuiniela, getLastActiveMiniQuiniela } = require('../../db/controllers/quinielaController')
const validateToken = require('../../midelwares/validateToken')
const { getTicketCode, pagarTodos } = require('./ticketServices')
const config = require('../../config.json')

router.post('/', validateToken, async (req, res) => {

    try {
        const { animals, type } = req.body
        const userId = res.user.user._id
        const user = await getUser(userId)
        required([animals, user, type], "Error, falta algun dato")
        const userLevel = user.level
        const userPercent = user.percent
        const { precioGranQuiniela, precioMiniQuiniela } = config
        const userCurrent = user
        required(userCurrent, "Usuario no encontrado al comprar el ticket")
        const precioQuiniela = type === 1 ? precioGranQuiniela : precioMiniQuiniela
        const agencia = user.level === 4 ? user : false
        required(!user.block, "Usuario Bloqueado")
        required(userLevel === 4 || userLevel === 5, "Tipo de usuario no autorizado para comprar tickets")

        const __date = new Date()
        const hora = __date.getHours()
        const min = __date.getMinutes()
        const horaMiniQuiniela = 15
        required(hora < horaMiniQuiniela, "Mini quiniela finalizada a las 03:00 PM, nueva para mañana a las 10:00 AM")

        if (hora === horaMiniQuiniela - 1) required(min < 51, "Mini quiniela finalizada a las 03:00 PM, nueva para mañana a las 10:00 AM.")
        

        const code = await getTicketCode()
        required(type === 1 || type === 2, "Tipo de quiniela incorrecto")
        required(type === 1 && animals.length === 6 || type === 2 && animals.length === 4, "Numero de animalitos incorrecto")

        if (user.prepaid) required(userCurrent.balance > precioQuiniela, "Usuario no tiene fondos")

        const gran = 1
        const mini = 2

        let admin = ""
        let grupero = ""

        if (userCurrent.admin) admin = await getUser(userCurrent.admin)
        if (userCurrent.grupero) grupero = await getUser(userCurrent.grupero)

        if (type === gran) {
            const activeGranQuiniela = await getLastActiveGranQuiniela()
            required(activeGranQuiniela, "Gran Quiniela a finalizado, la proxima inicia mañana a partir de las 10:00 AM")
            const hora = (new Date()).getHours()
            const date = new Date()
            date.setHours(date.getHours() - 4)
            const count = await countDocuments()

            const ticket = {
                user,
                userId: user._id,
                quinielaType: type,
                animals,
                hora,
                code,
                idQuiniela: activeGranQuiniela._id,
                quiniela: activeGranQuiniela._id,
                date,
                count
            }



            //sera requerido solo si la agencia es prepagada >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            const precioMenosPorcentaje = precioQuiniela - (userPercent * precioQuiniela / 100)
            if (userLevel === 4) {
                const increaseBalance = await icreaseUserBalance({ _id: ticket.user._id, balance: -precioMenosPorcentaje })
                required(increaseBalance, "No se pudo completar la venta en la agencia")
            } else if (userLevel === 5) {
                const increaseBalance = await icreaseUserBalance({ _id: ticket.user._id, balance: -precioQuiniela })
                required(increaseBalance, "No se pudo completar la venta")
            }

            ticket.report = await pagarTodos(precioQuiniela, userLevel, icreaseUserBalance, admin, grupero, agencia)
            console.log("Ticket report gran: ", ticket.report)

            const body = await saveTicket(ticket)
            if (!body) throw 'Error al guardar en ticket en la db'

            responser.success({ res, message: "success", body })


        } else if (type === mini) {

            const activeMiniQuiniela = await getLastActiveMiniQuiniela()
            required(activeMiniQuiniela, "Mini Quiniela a finalizado, la proxima inicia mañana a partir de las 10:00 AM")
            const hora = (new Date()).getHours()
            const date = new Date()
            date.setHours(date.getHours() - 4)
            const count = await countDocuments()
            const ticket = {
                user,
                userId: user._id,
                quinielaType: type,
                animals,
                hora,
                code,
                idQuiniela: activeMiniQuiniela._id,
                quiniela: activeMiniQuiniela._id,
                date,
                count
            }

            const precioMenosPorcentaje = precioQuiniela - (userPercent * precioQuiniela / 100)
            if (userLevel === 4) {
                const increaseBalance = await icreaseUserBalance({ _id: ticket.user._id, balance: -precioMenosPorcentaje })
                required(increaseBalance, "No se pudo completar la venta")
            } else if (userLevel === 5) {
                const increaseBalance = await icreaseUserBalance({ _id: ticket.user._id, balance: -precioQuiniela })
                required(increaseBalance, "No se pudo completar la venta")
            }

            ticket.report = await pagarTodos(precioQuiniela, userLevel, icreaseUserBalance, admin, grupero, agencia)

            console.log("Ticket report mini: ", ticket.report)

            const body = await saveTicket(ticket)
            required(body, "Error al guardar en ticket en la db")
            responser.success({ res, message: "success", body })
        } else {
            responser.error({ res, message: "Ocurrio un error al ingresar el tipo de quiniela" })
        }

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/current/:quinielaType', validateToken, async (_req, res) => {
    try {
        const quiniela = await getLastActiveGranQuiniela()
        console.log(quiniela)
        required(quiniela, "No se encontro una quiniela activa")
        responser.success({ res, message: "success", body: quiniela })
    } catch (error) {
        responser.error({ status: 400, res, message: error?.message || error })
    }
})

router.get('/find/one/:code', async (req, res) => {
    const { code } = req.params
    try {
        if (code.length !== 6) throw "Ticket invalido er.1"
        const body = await getTicket({ code })
        if (!body) throw "Ticket invalido err.2"
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/:from/:to', async (req, res) => {
    const { from, to } = req.params

    const newFrom = from + "T00:00:00.000+00:00";
    const newTo = to + "T23:59:59.000+00:00";

    const newDateFrom = new Date(newFrom)
    const newDateTo = new Date(newTo)

    /* console.log(newDateTo) */

    try {
        const body = await getTickets({ from: newDateFrom, to: newDateTo })
        responser.success({ res, message: "success", body })
    } catch (error) {
        /* console.log(error) */
        responser.error({ res, message: error })
    }
})

module.exports = router;