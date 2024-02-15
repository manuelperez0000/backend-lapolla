//listar todos los usuarios
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { findUsers } = require('../../db/controllers')

const validateToken = (req) => {
    const authorization = req.headers.authorization || ''
    const token = authorization.slice(7)
    try {
        jwt.verify(token, process.env.DATA_TOKEN, (err) => {
            if (err) {
                res.status(500).json({ message: 'No Aunthorization token' })
                return
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error en la autorizacion' })

    }
}

router.get('/', async (req, res) => {

    validateToken(req)

    try {
        const response = await findUsers()
        if (response) {
            res.status(200).json({ message: 'success', response })
            return
        } else {
            res.status(500).json({ message: 'No users found' })
            return
        }
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error de comunicacion con la base de datos' })
    }
})

module.exports = router;