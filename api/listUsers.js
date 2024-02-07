//listar todos los usuarios
const express = require('express')
const router = express.Router()
const { findUsers } = require('../db/controllers')

router.get('/users', async (req, res) => {

    try {
        const response = await findUsers()
        res.status(200).json({ message: 'success', response })
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error de comunicacion con la base de datos', response })
    }
})

module.exports = router;