const express = require('express')
const router = express.Router()
const blockUser = require('../../db/controllers/blockUserController')
const { getUser } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const { required, isMongoId } = require('../../services/validate')

//obteber todos los depositos de un usuario por medio de su id
router.post('/', validateToken, async (req, res) => {
    const _id = req.body._id
    try {
        required(_id, "Id es requerido")
        isMongoId(_id, "Formato incorrecto")
        const user = await getUser(_id)
        const block = !user.block
        const response = await blockUser(_id, block)
        required(response, "Este usuario no existe")
        responser.success({ res, message: `Usuario ${block ? "bloqueado" : "desbloqueado"} correctamente`, body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router
