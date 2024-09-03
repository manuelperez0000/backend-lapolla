//registro de ticket
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { required } = require('../../services/validate')
const { getTicketDate } = require('../../db/controllers/ticketController')
const validateToken = require('../../midelwares/validateToken')

router.post('/',validateToken, async (req, res) => {
    try {
        const user = res.user.user
        const data = req.body
        required([data.usuario, data.date])
        const obj = {
            usuario: data.usuario,
            date: data.date
        }
        const result = await getTicketDate(obj, user)

        responser.success({ res, message: "success", body: result })
    } catch (error) {
        /* console.log(error) */
        responser.error({ res, message: error })
    }
})

router.get('/', async (req, res) => {
    responser.success({ res, message: "success getting", body: {} })
})

module.exports = router;