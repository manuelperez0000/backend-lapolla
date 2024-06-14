//creacion de un banco
const express = require('express')
const router = express.Router()
const { setPrepaid, } = require('../../db/controllers/prepaidController')
const responser = require('../../network/response')
const { required, isMongoId } = require('../../services/validate')
const validateToken = require('../../midelwares/validateToken')
const onlyMaster = require('../../midelwares/onlyMaster')
const { getUser } = require('../../db/controllers/userController')

router.post('/', validateToken, onlyMaster, async (req, res) => {
    const _id = req.body._id
    try {
        required(_id, "Id es requerido")
        isMongoId(_id, "Formato incorrecto")
        const user = await getUser(_id)
        const state = !user?.prepaid
        const response = await setPrepaid({_id, state})
        required(response, "Este usuario no existe")
        responser.success({ res, message: `Usuario ${state ? "ahora es prepago" : "ya no es prepago"}`, body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }

})


module.exports = router;