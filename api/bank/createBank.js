//creacion de un banco
const express = require('express')
const router = express.Router()
const { saveBank } = require('../../db/controllers')

router.post('/', async (req, res) => {
    const bank = req.body

    const bankToCreate = {
        name: bank.name,
        email: bank.email,
        phone: bank.phone,
        password: bank.password,
        level:4
    }

    const response = await saveBank(bankToCreate)

    if (response) {
        res.status(200).json({ message: "success", response })
    } else {
        res.status(400).json({ message: "Error al crear un banco", response })
    }
})

module.exports = router;