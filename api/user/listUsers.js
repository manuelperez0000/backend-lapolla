//listar todos los usuarios
const express = require('express')
const router = express.Router()
const { findUsers } = require('../../db/controllers')
const validateToken = require('../../midelwares/validateToken')

router.get('/',validateToken, async (req, res) => {

    try {
        const response = await findUsers()
        if (response) {
            res.status(200).json({ message: 'success', response })
        } else {
            res.status(200).json({ message: 'Usuario no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error de comunicacion con la base de datos' })
    }
})

module.exports = router;