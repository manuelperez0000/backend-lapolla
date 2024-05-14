const { DATA_TOKEN } = require('../services/temporalEnv')
const jwt = require('jsonwebtoken')
const responser = require('../network/response')
const onlyMaster = (req, res, next) => {
    try {
        if (res.user.userData.level !== 1) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos' })
    }
}
module.exports = onlyMaster