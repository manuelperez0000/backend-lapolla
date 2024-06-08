//registro de usuarios
const express = require('express')
const router = express.Router()
const { updateUser } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

router.post('/', validateToken, async (req, res) => {
    const { name, email, phone, ci, level, _id, percent, grupero, admin } = req.body
    const user = res.user.user
    try {
        if(user.level > 1 && level < 3) throw "No tienes permisos para editar esta cuenta"
        if(user.level === level) throw "No tienes permisos para editar esta cuenta"
        if(user._id === _id) throw 'No posees los permisos para editar tu cuenta, contacta a tu superior para hacerlo'
        if (!name) throw 'El nombre es requerido'
        if (!_id) throw 'El _id es requerido'
        if (!ci) throw 'La cedula es requerido'
        if (!email) throw 'El email es requerido'
        if (!phone) throw 'El telefono es requerido'
        if (!percent) throw 'El percent es requerido'

        const userToUpdate = {
            name,
            email,
            phone,
            level,
            ci,
            _id,
            percent,
            grupero,
            admin
        }

        const body = await updateUser(userToUpdate)

        if (!body) throw "Error al actualizar el usuario"

        responser.success({ res, message: 'success', body })

    } catch (error) {
        console.log(error)
        responser.error({ res, message: error })
    }

})

module.exports = router;

