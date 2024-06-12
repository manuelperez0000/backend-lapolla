//creacion de un banco
const express = require('express')
const router = express.Router()
const { saveMethod, getMethods, deleteMethod, getMethod, updateChangeType } = require('../../db/controllers/methodController')
const responser = require('../../network/response')
const validate = require('../../services/validate')
const validateToken = require('../../midelwares/validateToken')
const onlyAdminAndMaster = require('../../midelwares/onlyAdminAndMaster')
const { saveChangeType, getChangeType } = require('../../db/controllers/tipoDeCambioController')

router.post('/addMethod', validateToken, async (req, res) => {
    try {
        const method = req.body
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
            userId: method.userId,
            secondary: method.secondary,
            tipoDeCambio: method?.tipoDeCambio || 1,
            adminMethodId: method?.adminMethodId || "000000000000000000000000"
        }

        const user = res.user.user
        if (methodToCreate.cedula) {
            validate.required(methodToCreate.cedula === user.ci || user.level === 1,
                "No se Permiten cuentas de terceros, esta intentando registrar un metodo de pago con la Cedula: "
                + methodToCreate.cedula + " y su cedula es: " + user.ci)
        }

        if (methodToCreate.correo) {
            validate.required(methodToCreate.correo === user.email || user.level === 1,
                "No se Permiten cuentas de terceros, esta intentando registrar un metodo de pago con el correo: "
                + methodToCreate.correo + " y su correo es: " + user.email)
        }



        /* if (methodToCreate.adminMethodId !== "createdByAdmin" ) {
            //encontrar el tipo de cambio de este metodo por el id
            const findedMethodById = await getMethod(adminMethodId)
            console.log(findedMethodById)
            //setear el tipo de cambio aqui
            methodToCreate.tipoDeCambio = findedMethodById?.tipoDeCambio || 1
        } */

        validate.required(methodToCreate.methodName, "Debe agregar un nombre del metodo")
        validate.required(methodToCreate.secondary, "Debe elegir un diferenciador")
        validate.required(methodToCreate.imageUrl, "Debe agregar una imagen")
        validate.required(methodToCreate.userId, "Debe proporcionar un id de usuario")

        const response = await saveMethod(methodToCreate)
        responser.success({ res, body: response, message: "Agregado con exito" })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/changeType', validateToken, onlyAdminAndMaster, async (_req, res) => {

    try {
        const body = await getChangeType()
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }

})

router.get('/getMethod/:id', async (req, res) => {
    const { id } = req.params
    try {
        validate.required(id)
        const body = await getMethod(id)

        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/getMethods/:id', validateToken, async (req, res) => {

    try {
        const { id } = req.params
        validate.required(id)
        const body = await getMethods(id)

        const filteredMethods = body.filter(method => !method.deleted)

        responser.success({ res, message: "success", body: filteredMethods })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const _id = req.params.id
        validate.required(_id, "Id es requerido")
        const response = await deleteMethod(_id)
        validate.required(response, "No se encontro este metodo de pago")
        responser.success({ res, message: "Eliminado con exito", body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }

})

router.put('/changeType', validateToken, onlyAdminAndMaster, async (req, res) => {
    try {
        const { _id, tipoDeCambio } = req.body
        validate.required([_id, tipoDeCambio], "Falta un dato")

        const method = await getMethod(_id)
        const user = res.user.user
        const change = {
            user,
            method,
            later: method.tipoDeCambio,
            current: tipoDeCambio
        }

        const response = await saveChangeType(change)
        validate.required(response, "Ocurrio un error al guardar los cambio")

        const changed = await updateChangeType({ _id, tipoDeCambio })
        validate.required(changed, "Error al intentar guardar el tipo de cambio")



        responser.success({ res, message: "Actualizado correctamente", body: response })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }

})

module.exports = router;