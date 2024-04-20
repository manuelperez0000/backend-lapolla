const { DATA_TOKEN } = require('../services/temporalEnv')
const jwt = require('jsonwebtoken')
const responser = require('../network/response')
const validateToken = (req, res, next) => {
    const authorization = req.headers.authorization || ''
    const token = authorization.slice(7)
    console.log("Token: ", token)
    try {
        jwt.verify(token, DATA_TOKEN, (err, decoded) => {
            if (err) {
                throw 'Error de validacion del token'
            } else {
                res.user = decoded
                next()
            }
        })
    } catch (error) {
        responser.error({ res, message: 'Error al intentar validar el token' })
    }
}
module.exports = validateToken