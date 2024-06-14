/* eslint-disable no-undef */
//registro de ticket
process.env.TZ = "America/Caracas"
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { saveTicket, getTickets, getTicket, countDocuments } = require('../../db/controllers/ticketController')
const { icreaseUserBalance, getUser } = require('../../db/controllers/userController')
const { getConfig } = require('../../db/controllers/configController')
const validate = require('../../services/validate')
const { required } = require('../../services/validate')
const { getLastActiveGranQuiniela } = require('../../db/controllers/quinielaController')
const validateToken = require('../../midelwares/validateToken')

router.post('/', validateToken, async (req, res) => {
    try {
        const userLevel = res.user.user.level
        required(userLevel === 4 || userLevel === 5,"Tipo de usuario no autorizado para comprar tickets")

        const { animals, user, type, code } = req.body
        validate.required([animals, user, type, code], "Error, falta algun dato")

        const hora = (new Date()).getHours()

        const idQuiniela = await getLastActiveGranQuiniela()
        validate.required(idQuiniela, "No esta activa ninguna quiniela")

        const date = new Date()
        date.setHours(date.getHours() - 4)

        const count = await countDocuments()

        const ticket = {
            user,
            quinielaType: type,
            animals,
            hora,
            code,
            idQuiniela: idQuiniela._id,
            date,
            count
        }

        const { precioGranQuiniela, precioMiniQuiniela, premioCasa, horasMiniQuiniela } = await getConfig()
        validate.required([precioGranQuiniela, precioMiniQuiniela, premioCasa], "Error al obteber datos del config")

        //validate.required(hora < horasMiniQuiniela, "Las mini quinielas inician a las " + horasMiniQuiniela[0])

        const horaMiniQuiniela2 = horasMiniQuiniela[1]
        const horaMiniQuiniela3 = horasMiniQuiniela[2]

        if (hora >= horaMiniQuiniela2 && hora < horaMiniQuiniela3) {
            //se crea una nueva miniquiniela 2
            //se cierra la quiniela 1
        }

        if (hora >= horaMiniQuiniela3 && hora < horaMiniQuiniela3 + 4) {
            //se crea una nueva miniquiniela 3
            //se cierra la quiniela 2
        }

        const userCurrent = await getUser(ticket.user._id)
        required(userCurrent, "Usuario no encontrado")

        const precioQuiniela = type === 1 ? precioGranQuiniela : precioMiniQuiniela
        //sera requerido solo si la agencia no es prepagada >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        required(userCurrent.balance > precioQuiniela, "Usuario no tiene fondos")

        const increaseBalance = await icreaseUserBalance({ _id: ticket.user._id, balance: -precioQuiniela })
        required(increaseBalance, "No se pudo completar la venta")

        let admin = ""
        let percentAdmin = 0
        let grupero = ""
        let percentGrupero = 0

        if (userCurrent.admin) {
            admin = await getUser(userCurrent.admin)
            if (admin) percentAdmin = admin.percent
        }

        if (userCurrent.grupero) {
            grupero = await getUser(userCurrent.grupero)
            if (grupero) percentGrupero = grupero.percent
        }

        const adminAmount = percentAdmin * precioQuiniela / 100
        const gruperoAmount = percentGrupero * precioQuiniela / 100
        const userCurrentAmount = userCurrent.percent * precioQuiniela / 100

        const masterAmount = (precioQuiniela - (precioQuiniela * premioCasa / 100)) - gruperoAmount - adminAmount - userCurrentAmount

        ticket.report = {
            precioQuiniela,
            agencia: {
                amount: userCurrentAmount,
                percent: userCurrent.percent,
                _id: userCurrent._id
            },
            admin: {
                amount: adminAmount,
                percent: percentAdmin,
                _id: userCurrent.admin
            },
            grupero: {
                amount: gruperoAmount,
                percent: percentGrupero,
                _id: userCurrent.grupero
            },
            master: {
                amount: masterAmount,
                _id: "66207f0edf3abd9ae2cb076d"
            },
            premio: premioCasa * precioQuiniela / 100
        }

        const body = await saveTicket(ticket)
        if (!body) throw 'Error al guardar en ticket en la db'

        responser.success({ res, message: "success", body })

    } catch (error) {
        console.log(`del throw ${error}`)
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
        responser.error({ status:400, res, message: error?.message || error })
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

    console.log(newDateTo)

    try {
        const body = await getTickets({ from: newDateFrom, to: newDateTo })
        responser.success({ res, message: "success", body })
    } catch (error) {
        console.log(error)
        responser.error({ res, message: error })
    }
})

module.exports = router;