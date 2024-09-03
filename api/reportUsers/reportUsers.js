//creacion de un banco
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { required, isMongoId } = require('../../services/validate')
const { getReport } = require('./reportUserController')
const validateToken = require('../../midelwares/validateToken')

router.get('/:_id/:from/:to', validateToken, async (req, res) => {
    const { _id, from, to } = req.params
    const user = res.user.user
   /*  console.log(user.name) */
    try {

        isMongoId(_id)
        required([from, to])

        const body = await getReport(_id, from, to)

        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;