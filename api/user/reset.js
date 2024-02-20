//reseteo de contrasena 
const express = require('express')
const router = express.Router()
const temporalPass = require('../../services/temporalPassGenerate')
const sendMail = require('../../services/nodemailer')
const { findOneUsersWhitEmail, saveTemporalPass, findTemporalPass, deleteTemporalPass, changeUserPassword } = require('../../db/controllers')
const responser = require('../../network/response')

router.post('/gettemporalpass', async (req, res) => {
    const { email } = req.body

    try {
        const password = temporalPass()
        const exists = findOneUsersWhitEmail(email)
        if (!exists) {
            throw 'El correo proporcionado no se encuentra registrado en nuestra base de datos'
        }
        const response = await saveTemporalPass(email, password)
        await sendMail(email, password)
        responser.success({ res, message: 'success', body: response })
    } catch (error) { responser.error({ res, message: error }) }

})

router.post('/setnewpassword', async (req, res) => {
    const { email, password, temporalPass } = req.body

    try {

        if (!email) throw 'Debe proporcionar un email'
        if (!password) throw 'Debe proporcionar un password'
        if (!temporalPass) throw 'Debe proporcionar una Clave temporal'

        //comprobar que la clave se encuentra registrada
        const findTemporal = await findTemporalPass(email, temporalPass)
        if (!findTemporal) throw "Clave temporal expirada"

        //borrar la clave temporal
        await deleteTemporalPass(email, temporalPass)

        //cambiar la contrasena del usuario
        const response = await changeUserPassword(email, password)

        responser.success({ res, message: 'success', body: response })

    } catch (error) { responser.error({ res, message: error }) }

})

module.exports = router;