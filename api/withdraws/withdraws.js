const express = require('express')
const router = express.Router()
const { getWithdraws, saveWithdraw, aproveWithdraw, getWithdraw } = require('../../db/controllers/withdrawController')
const { getMethod } = require('../../db/controllers/methodController')
const { icreaseUserBalance, getUser } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

const validate = require('../../services/validate')

router.get('/', validateToken, async (req, res) => {
    try {
        const body = await getWithdraws()
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.get('/:id', validateToken, async (req, res) => {
    const _id = req.params.id
    try {
        validate.required(_id)
        const body = await getWithdraw(_id)
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/', validateToken, async (req, res) => {

    const { userId, payMethodId, amount } = req.body

    try {
        validate.required([userId, amount, payMethodId])
        validate.string([userId, payMethodId])
        validate.number(amount)

        const payMethod = await getMethod(payMethodId)
        validate.required(payMethod, "Metodo invalido ")

        const user = await getUser(userId)
        validate.required(user, "usuario invalido")

        const dataToSave = {
            amount,
            payMethod,
            user: {
                _id: user._id,
                name: user.name,
                balance: user.balance,
                level:user.level,
                ci:user.ci,
                phone: user.phone,
                email: user.email
            }
        }

        const userBalance = await icreaseUserBalance({ _id:user._id, balance:-amount })
        validate.required(userBalance)

        const body = await saveWithdraw(dataToSave)
        validate.required(body, "No se pudo guardar en la base de datos")

        responser.success({ res, message: "success", body })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.put('/', validateToken, async (req, res) => {
    const data = {
        _id: req.body._id,
        userId: req.body.userId,
        amount: req.body.amount,
        adminMethodId: req.body.adminMethodId
    }

    try {
        validate.required([data.userId, data.amount, data.adminMethodId, data._id])
        validate.string([data.userId, data.adminMethodId, data._id])
        validate.number(data.amount)

        //obtengo el usuario
        const user = await getUser(data.userId)
        //valido que exista
        validate.required(user, "Usuario no encontrado")

        //obtener el metodo del admin 
        const methodId = await getMethod(data.adminMethodId)
        //valido el metodo de pago
        validate.required(methodId, "metodo de pago no encontrado: " + data.adminMethodId)

        //le resto el balance al usuario
        const resInreaceBalance = await icreaseUserBalance({ _id: data.userId, balance: -data.amount })
        //valido que se aya incrementado el balance 
        validate.required(resInreaceBalance, "A ocurrido un error al intentar retirar el balance")

        //cambio el estatus de whitdraw de 1 a 2
        const body = await aproveWithdraw(data._id)
        console.log(body)
        validate.required(body, "No su pudo actualizar el retiro")

        responser.success({ res, message: "Peticion de retiro exitosa", body })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router

