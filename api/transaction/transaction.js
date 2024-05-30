const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const validate = require('../../services/validate')
const { icreaseUserBalance, getUser } = require('../../db/controllers/userController')

router.post('/', validateToken, async (req, res) => {
    try {
        const idUserFrom = res.user.user._id
        const idUserTo = req.body._id
        const amount = req.body.amount

        validate.required([idUserFrom, idUserTo, amount])

        //obtener saldo del usuario
        const userData = await getUser(idUserFrom)
        validate.required([userData, userData.balance >= amount], "Saldo insuficiente")

        const response1 = await icreaseUserBalance({ _id: idUserFrom, balance: -amount })
        validate.required(response1, "Ocurrio un error al intentar restar el saldo")
        const response2 = await icreaseUserBalance({ _id: idUserTo, balance: amount })
        validate.required(response2, "Ocurrio un error al intentar sumar el saldo")

        responser.success({ res, message: "success", body: { response1, response2 } })
    } catch (error) {
        console.log(error)

        responser.error({ res, message:error.message || error })
    }
})

module.exports = router;