const { DATA_TOKEN } = require('../services/temporalEnv')
const jwt = require('jsonwebtoken')

const validateToken = (req, res,next) => {
    const authorization = req.headers.authorization || ''
    const token = authorization.slice(7)
    try {
        jwt.verify(token, DATA_TOKEN, (err,decoded) => {
            if (err) {
                throw Error('Error de validacion del token',err)
            }
            res.user = decoded
            next()
        })
    } catch (error) {
        res.status(500).json({message:'Error en validador del token',error})
    }
}
module.exports = validateToken