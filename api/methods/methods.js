//creacion de un banco
const express = require('express')
const router = express.Router()
const { saveMethod, getMethods, deleteMethod } = require('../../db/controllers/methodController')
const responser = require('../../network/response')

router.post('/addMethod', async (req, res) => {
    const method = req.body
    //responser.success({ res, body: method, message: "success" })

    const methodToCreate = {
        correo: method.correo,
        cuenta: method.cuenta,
        tipo: method.tipo,
        cedula: method.cedula,
        banco: method.banco,
        nombre: method.nombre,
        methodName: method.methodName,
        telefono: method.telefono,
        imageUrl: method.imageUrl,
        userId: method.userId
    }

    console.log(methodToCreate)

    try {
        const response = await saveMethod(methodToCreate)
        responser.success({ res, body: response, message: "Agregado con exito" })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.get('/getMethods/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await getMethods(id)
        responser.success({ res, message: "success", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/delete', async (req, res) => {
    const { _id } = req.body
    try {
        const response = await deleteMethod(_id)
        responser.success({ res, message: "Eliminado con exito", body: response })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }

})

module.exports = router;