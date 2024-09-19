//creacion de un banco
const express = require('express')
const router = express.Router()
const { setPrepaid, } = require('../../db/controllers/prepaidController')
const responser = require('../../network/response')
const { required, isMongoId } = require('../../services/validate')
const validateToken = require('../../midelwares/validateToken')
const { getUser } = require('../../db/controllers/userController')
const { levelPermisions } = require('../../services/utils')



router.post('/', validateToken, async (req, res) => {
    const _id = req.body._id
    try {

        required(_id, "Id es requerido")
        isMongoId(_id, "Formato de id incorrecto")
        const user = await getUser(_id)
        
        const adminLevel = res.user.user.level
        levelPermisions({adminLevel,userLevel:user.level})
        
        const state = !user?.prepaid
        const response = await setPrepaid({_id, state})
        required(response, "Este usuario no existe")
        responser.success({ res, message: `${state ? "Ahora es prepagado" : "Ahora puede vender sin saldo"}`, body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }

})

 
module.exports = router;