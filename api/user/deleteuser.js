//listar todos los usuarios
const express = require('express')
const router = express.Router()
/* const { deleteUser } = require('../../db/controllers/userController') */
const validateToken = require('../../midelwares/validateToken')
const responser = require('../../network/response')

router.delete('/:id', validateToken, async (req, res) => {
    const _id = req.params.id
    console.log(_id)
    responser.success({ res, message: 'success', body: { _id } })
    /*  return
     try {
         if (!_id) throw 'Debe indicar el _id del usuario'
         if (res.user.user._id === _id) throw 'No puedes eliminar tu propio usuario'
 
         const response = await deleteUser({ _id })
 
         if (!response) throw 'Usuario no encontrado err .01'
 
         if (response.deletedCount === 0) throw "Usuario no encontrado err .02"
 
         responser.success({ res, message: 'success', body: response })
 
     } catch (error) {
         console.log(error)
         responser.error({ res, message: error.message || error })
     } */
})

module.exports = router;