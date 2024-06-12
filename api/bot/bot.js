const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const pollabot = require('./pollabot')
const validateToken = require('../../midelwares/validateToken')
const createNewQuiniela = require('./controllers/createNewQuiniela')

router.put('/', validateToken, async (_req, res) => {
    try {

        const response = await createNewQuiniela()
        console.log(response)
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;