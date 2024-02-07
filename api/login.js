//login de usuarios
const express = require('express')
const router = express.Router()
const { findOneUsersWhitEmail,findOneUsersWhitEmailAndPassword } = require('../db/controllers')
/* const userLevel = require('../services/userLevels.json') */

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(500).json({ message: 'Se espera un correo y una contraseña' })
            return
        }


        const userFinded = await findOneUsersWhitEmail(email)

        if (!userFinded) {
            res.status(500).json({ message: "Usuario no registrado" })
            return
        }

        const response = await findOneUsersWhitEmailAndPassword(email,password)
        
        if (response) {
            res.status(200).json({ message: "success", response })
        } else {
            res.status(500).json({ message: "Usuario o contraseña incorrecta" })
        }

    } catch (error) {
        console.log(error)
        res.end(error)
    }
})

module.exports = router;