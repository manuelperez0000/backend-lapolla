const responser = require('../network/response')

const onlyStaf = (_req, res, next) => {
    try {

        if (res.user.user.level > 4) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos staff' })
    }
}



module.exports = onlyStaf
