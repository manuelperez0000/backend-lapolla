const express = require('express')
const router = express.Router()
const { getDepositsOfUser } = require('../../db/controllers/depositController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

//obteber todos los depositos de un usuario por medio de su id
router.get('/:id',validateToken, async (req, res) => {
    const _id = req.params.id
    try {
        const response = await getDepositsOfUser(_id)
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router

