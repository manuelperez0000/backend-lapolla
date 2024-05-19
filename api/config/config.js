const express = require('express')
const router = express.Router()
const { saveConfig, getConfig, updateConfig } = require('../../db/controllers/configController')
const responser = require('../../network/response')

router.post('/save', async (req, res) => {
    try {
        const response = await saveConfig()
        
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await getConfig()
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/update', async (req, res) => {
    try {
        
        const { premioCasa,
            precioGranQuiniela,
            precioMiniQuiniela,
            horaGranQuiniela,
            horasMiniQuiniela
        } = req.body

        const config = {
            premioCasa,
            precioGranQuiniela,
            precioMiniQuiniela,
            horaGranQuiniela,
            horasMiniQuiniela,
        }

        const response = await updateConfig(config)

        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router;