//obtener un usuario por id
const express = require('express')
const router = express.Router()
const { getUser, getUserByCi } = require('../../db/controllers/userController')
const { getMethods, getAdminMethods } = require('../../db/controllers/methodController')
const { getConfig } = require('../../db/controllers/configController')
const validateToken = require('../../midelwares/validateToken')
const responser = require('../../network/response')
const cors = require('cors')

router.get('/ci/:ci', cors(), validateToken, async (req, res) => {

    const ci = req.params.ci
    try {
        const body = await getUserByCi({ ci })

        if (!body) throw 'Usuario no encontrado'

        responser.success({ res, message: 'success', body })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})
 
router.get('/:id', cors(), validateToken, async (req, res) => {

    const _id = req.params.id
    try {
        const user = await getUser({ _id })

        if (!user) throw 'Usuario no encontrado'

        const userMethods = await getMethods(_id)

        const adminMethods = await getAdminMethods()

        const config = await getConfig()

        const body = {
            _id: user._id,
            name: user.name,
            ci: user.ci,
            email: user.email,
            phone: user.phone,
            level: user.level,
            grupero: user.grupero,
            admin: user.admin,
            percent: user.percent,
            balance: user.balance,
            date: user.date,
            userMethods,
            adminMethods,
            config
        }

        responser.success({ res, message: 'success', body })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})



module.exports = router;