//reseteo de contrasena 
const express = require('express')
const router = express.Router()
const temporalPass = require('../../services/temporalPassGenerate')
const sendMail = require('../../services/nodemailer')
const { findOneUsersWhitEmail, saveTemporalPass, findTemporalPass, deleteTemporalPass, changeUserPasswor } = require('../../db/controllers')
const responser = require('../../services/responser')

router.post('/gettemporalpass', async (req, res) => {
    const { email } = req.body

    //crear una nueva clave temporal
    const password = temporalPass()

    //comprobar que el usuario existe
    const exists = findOneUsersWhitEmail(email)
    if (!exists) {
        res.status(400).json({ message: 'El correo proporcionado no se encuentra registrado en nuestra base de datos' })
        return
    }

    //guardar clave temporal
    const response = await saveTemporalPass(email, password)
    await sendMail(email)

    responser(res, response)
})

router.post('/comparetemporalpass', async (req, res) => {
    const { email, password } = req.body

    const response = await findTemporalPass(email, password)

    responser(res, response)
})

router.post('/setnewpassword', async (req, res) => {
    const { email, password1, password2, temporalpass } = req.body
    const password = temporalpass

    if (password1 !== password2) {
        res.status(400).json({ message: 'Las claves ingresadas no coinciden' })
        return
    }


    //comprobar que la clave se encuentra registrada
    const findTemporal = await findTemporalPass(email, password)
    if (!findTemporal) {
        res.status(400).json({ message: "Clave temporal expirada" })
        return
    }

    //borrar la clave temporal
    await deleteTemporalPass(email, password)

    //cambiar la contrasena del usuario
    const response = await changeUserPasswor(email, password1)

    responser(res, response)
})

module.exports = router;