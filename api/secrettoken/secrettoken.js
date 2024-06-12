//creacion de un banco
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { verifyIfCodeIsUsed } = require('../../db/controllers/ticketController')
const validateToken = require('.././../midelwares/validateToken')

const getSecretToken = () => {
    const digits = "23456789ACDEFGHJKLMPQRTUX"
    const randomDigit = () => digits[Math.floor((Math.random() * digits.length))]
    let ticketCode = ""
    for (let index = 1; index < 7; index++) {
        ticketCode += randomDigit()
    }
    return ticketCode
}

router.get('/', validateToken, async (req, res) => {
    try {
        //obtener todos los tickets que posean un token igual
        let ticketCode = getSecretToken()
        let intentos = 0
        let used = false

        while (!used && intentos < 10) {
            intentos += 1
            console.log(intentos)
            const verified = await verifyIfCodeIsUsed(ticketCode)
            if (verified) {
                ticketCode = getSecretToken()
            } else {
                used = true
            }
        }

        responser.success({ res, message: "success", body: { ticketCode } })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;