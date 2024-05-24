const express = require('express')
const router = express.Router()
const { getWithdraws, saveWithdraw, aproveWithdraw, getWithdraw } = require('../../db/controllers/withdrawController')
const { getMethod } = require('../../db/controllers/methodController')
const { icreaseUserBalance, getUser } = require('../../db/controllers/userController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

const validate = require('../../services/validate')

//obtener todos los retiros
router.get('/', validateToken, async (req, res) => {
    try {
        const body = await getWithdraws()
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

//aprobar un retiro
router.put('/', validateToken, async (req, res) => {

    const { _id } = req.body
    try {

        //cambiar el estado del whitdraw
        const withdraw = await getWithdraw(_id)
        validate.required(withdraw, "No se encontro el retiro")

        const aprove = await aproveWithdraw(_id)
        validate.required(aprove, "No se encontro retiro")

        responser.success({ res, message: "Peticion de retiro exitosa", body: aprove })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

//obtener un retiro por su id
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

//guardar un retiro
router.post('/', validateToken, async (req, res) => {

    const { userId, payMethodId, amount } = req.body

    try {
        validate.required(userId, "Error: Id es requerido")
        validate.required(amount, "Error: el monto es requerido")
        validate.required(amount > 0, "Error: el monto no puede ser cero o menos de cero")
        validate.required(payMethodId, "Error: Debe elegir un metodo de pago")
        validate.string([userId, payMethodId])
        validate.number(amount)

        const payMethod = await getMethod(payMethodId)
        validate.required(payMethod, "Metodo invalido ")

        const user = await getUser(userId)
        validate.required(user, "usuario invalido")

        validate.required(user.balance >= amount, "Usted no posee fondos")

        //retirar el sado al usuario
        const respRestarSaldo = await icreaseUserBalance({ _id: userId, balance: -amount })
        validate.required(respRestarSaldo, "Ocurrio un error al intentar restar el sado")

        const dataToSave = {
            amount,
            payMethod,
            userId,
            user: {
                _id: user._id,
                name: user.name,
                balance: respRestarSaldo.balance,
                level: user.level,
                ci: user.ci,
                phone: user.phone,
                email: user.email
            }
        }

        const body = await saveWithdraw(dataToSave)
        validate.required(body, "No se pudo guardar en la base de datos")

        responser.success({ res, message: "success", body })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router

