//reseteo de contrasena 
const express = require('express')
const router = express.Router()
const getTemporalPass = require('../../services/temporalPassGenerate')
const sendMail = require('../../services/nodemailer')
const {
    findOneUsersWhitEmail,
    saveTemporalPass,
    findTemporalPass,
    deleteTemporalPass,
    changeUserPassword
} = require('../../db/controllers')
const responser = require('../../network/response')

router.post('/gettemporalpass', async (req, res) => {
    const { email } = req.body
    try {
        if (!email) throw 'Debe proporcionar un correo electronico'
        const temporalPass = getTemporalPass()
        const userExist = await findOneUsersWhitEmail(email)
        if (!userExist) throw 'Este correo no se encuentra registrado'
        const body = await saveTemporalPass({ email, temporalPass })
        if (!body) throw 'Error al intentar guardar su clave temporal'
        await sendMail({ email, temporalPass })
        responser.success({ res, message: 'Clave temporal enviada a su correo', body })
    } catch (error) { responser.error({ res, message: error }) }
})

router.post('/setnewpassword', async (req, res) => {
    const { email, password, temporalPass } = req.body

    try {
        if (!email) throw 'Debe proporcionar un email'
        if (!password) throw 'Debe proporcionar un password'
        if (!temporalPass) throw 'Debe proporcionar una Clave temporal'

        //comprobar que la clave se encuentra registrada
        const findTemporal = await findTemporalPass({email, temporalPass})
        if (!findTemporal) throw "Clave temporal expirada"

        //borrar la clave temporal
        await deleteTemporalPass({email, temporalPass})

        //cambiar la contrasena del usuario
        const body = await changeUserPassword({email, password})
        if(!body) throw 'Error, no se a podido actualizar su clave'

        responser.success({ res, message: 'Clave cambiada con exito', body })

    } catch (error) { responser.error({ res, message: error }) }

})

module.exports = router;