//registro de usuarios
const express = require('express')
const router = express.Router()
const { saveUser,findOneUsersWhitEmail } = require('../db/controllers')

router.post('/register', async (req, res) => {
    const user = req.body

    const userToRegister = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        level:4
    }

    //comprobar que no exista otro usuario con el mismo correo

    const registeredUser = await findOneUsersWhitEmail(userToRegister.email)

    if(registeredUser){
        res.status(500).json({ message: "Este correo ya se encuentra registrado" })
        return
    }

    const response = await saveUser(userToRegister)

    if (response) {
        res.status(200).json({ message: "success", response })
    } else {
        res.status(500).json({ message: "Error al registrar", response })
    }
})

module.exports = router;