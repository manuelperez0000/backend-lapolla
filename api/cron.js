/* eslint-disable no-undef */
require('dotenv').config({ path: '.env' })
const express = require('express')
const router = express.Router()
const responser = require('../network/response')
const { repartirPremiosMiniQuiniela } = require('../pollabot/services/repartirPremiosMiniQuiniela')
const { createNewMiniQuiniela2,closeMiniQuiniela } = require('../pollabot/services/createNewMiniQuiniela')
const { required } = require('../services/validate')
const { apagarGranQuinielaAnterior } = require('../pollabot/workers/granQuinielaWorker')
const { validateTokenParams } = require('../services/utils')

router.get('/:token', async (req, res) => {
  try {

    const token = req?.params?.token

    const { GQ_INIT, MQ_INIT, MIQ_END, MQ_CLOSE } = process.env

    /* responser.success({ res, message: "success", body: { GQ_INIT, MQ_INIT, MIQ_END,token } })
    return */

    required(validateTokenParams(token, { GQ_INIT, MQ_INIT, MIQ_END, MQ_CLOSE }), "token invalido")


    if (token === MQ_CLOSE) {
      const body = closeMiniQuiniela()
      responser.success({ res, message: "Mini quiniela cerrada", body })
    }

    if (token === GQ_INIT) {
      const objResult = await apagarGranQuinielaAnterior()
      responser.success({ res, message: "Gran quiniela bot init", body: { token, GQ_INIT, objResult } })
    }

    if (token === MQ_INIT) {
      const body = await createNewMiniQuiniela2()
      responser.success({ res, message: "bot ejecutado mini", body })
    }

    if (token === MIQ_END) {
      const body = await repartirPremiosMiniQuiniela()
      console.log(body)
      responser.success({ res, message: "bot ejecutado close mini 2", body })
    }

  } catch (error) {
    responser.error({ res, message: error?.message || error })
  }
})

router.get('/', (req, res) => {
  responser.success({ res, message: "Token es requerido", body: {} })
})

module.exports = router