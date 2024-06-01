const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { getQuinielas, saveQuiniela, finalizarQuiniela, getLastActiveGranQuiniela } = require('../../db/controllers/quinielaController')
const validateToken = require('../../midelwares/validateToken')
const onlyMaster = require('../../midelwares/onlyMaster')
const { getAyerYhoy, to59 } = require('../bot/utils')
const { getConfig } = require('../../db/controllers/configController')
const { findTicketsByIdQuiniela } = require('../../db/controllers/ticketController')
const validate = require('../../services/validate')
const { winers } = require('../bot/utils')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')

router.get('/', async (req, res) => {
    try {
        const body = await getQuinielas()
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/', validateToken, onlyMaster, async (_req, res) => {

    try {

        const { fechaHoy } = getAyerYhoy()
        const { premioCasa, horaGranQuiniela, precioGranQuiniela, horasMiniQuiniela } = await getConfig()

        const _granQuiniela = {
            precioQuiniela: precioGranQuiniela,
            horaDeLanzamiento: horaGranQuiniela,
            tipoQuiniela: 1,
            porcentajePremio: premioCasa,
            fechaQuiniela: fechaHoy,
        }

        const _miniQuiniela = {
            precioQuiniela: precioGranQuiniela,
            horaDeLanzamiento: horasMiniQuiniela[0],
            tipoQuiniela: 2,
            porcentajePremio: premioCasa,
            fechaQuiniela: fechaHoy,
        }

        //comprobar si ya esta activa la gran quiniela de hoy
        //obtener una gran quiniela con la fecha de hoy
        const quinielasDeHoy = await getQuinielas({ fechaQuiniela: fechaHoy })
        const granQuinielasDeHoy = quinielasDeHoy.filter(item => item.tipoQuiniela === 1)
        const miniQuinielasDeHoy = quinielasDeHoy.filter(item => item.tipoQuiniela === 2)

        let granQuiniela = { validated: false }
        let miniQuiniela = { validated: false }

        //si la fecha de gran quiniela es ayer continua sino
        if (granQuinielasDeHoy.length === 0) {
            granQuiniela.validated = true
            granQuiniela.result = await saveQuiniela(_granQuiniela)
            validate.required(granQuiniela, "No se pudo crear la gran quiniela")
        }

        if (miniQuinielasDeHoy.length === 0) {
            miniQuiniela.validated = true
            miniQuiniela.result = await saveQuiniela(_miniQuiniela)
            validate.required(miniQuiniela, "No se pudo crear la mini quiniela")
        }

        responser.success({ res, message: "success", body: { granQuiniela, miniQuiniela } })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.put('/', validateToken, onlyMaster, async (_req, res) => {
    try {
        //obtener gran quiniela ultima
        const activeGranQuiniela = await getLastActiveGranQuiniela()

        console.log("fechaquiniela: ", activeGranQuiniela.fechaQuiniela)

        //await finalizarQuiniela(activeGranQuiniela._id)
        //traer todos los tickets con el id de esta quiniela
        const tickets = await findTicketsByIdQuiniela(activeGranQuiniela._id)
        //obtener los animales para esta quiniela

        console.log("cantidad de tickets: ", tickets.length)
        const fechaMasUnDia = (_fecha) => {
            console.log("first fecha:  ", _fecha)
            _fecha.setDate(_fecha.getDate() + 1)
            _fecha.setHours(_fecha.getHours() + 4)
            console.log("_fecha", _fecha)
            return _fecha
        }


        const fecha = fechaMasUnDia(activeGranQuiniela.fechaQuiniela)
        const animals = await getFilteredAnimals({ from: fecha, to: to59(fecha) })
        console.log("animals:", animals)
        const newAnimals = animals.map(i => i.animalId)
        console.log("newAnimals:", newAnimals)


        const winnerTickets = winers(tickets, newAnimals)
        console.log(winnerTickets)
        //repartir la plata a los ganadores
        const precioGranQuiniela = activeGranQuiniela.precioQuiniela
        const premioTotal = tickets.length * 0.8 * precioGranQuiniela
        const premio6asiertos = premioTotal * 0.7
        const premio5asiertos = premioTotal * 0.3

        console.log("premioTotal", premio6asiertos, premio5asiertos)

        responser.success({ res, message: "Cerrando quinielas", body: {} })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router;