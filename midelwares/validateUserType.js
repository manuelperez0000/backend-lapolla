const jwt = require('jsonwebtoken')
const { DATA_TOKEN } = require('../services/temporalEnv')
const responser = require('../network/response')

const validateUserType = (req, res, next) => {
    const authorization = req.headers.authorization || ''
    const token = authorization.slice(7)
    try {
        jwt.verify(token, DATA_TOKEN, (err, decoded) => {
            if (err) {
                next()
            } else {
                res.user = decoded
                next()
            }
        })
    } catch (error) {
        responser.error({ res, message: error.message || 'Error al intentar validar el token' })
    }
}

module.exports = validateUserType