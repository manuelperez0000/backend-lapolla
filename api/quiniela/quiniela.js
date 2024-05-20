const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { getQuinielas, saveQuiniela } = require('../../db/controllers/quinielaController')
const validateToken = require('../../midelwares/validateToken')
const onlyMaster = require('../../midelwares/onlyMaster')
const { getAyerYhoy } = require('../bot/utils')
const { getConfig } = require('../../db/controllers/configController')
const validate = require('../../services/validate')

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

module.exports = router;