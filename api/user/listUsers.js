//listar todos los usuarios
const express = require('express')
const router = express.Router()
const { findUsers } = require('../../db/controllers')
const validateToken = require('../../midelwares/validateToken')

router.get('/', validateToken, async (req, res) => {

    try {
        const response = await findUsers()
        
        if (!response) { throw 'Usuarios no encontrado' }

        res.status(200).json({ message: 'success', response })

    } catch (error) {
        throw 'Ocurrio un error de comunicacion con la base de datos'
    }
})

module.exports = router;