const responser = require('../network/response')

const onlyMaster = (_req, res, next) => {
    try {
        if (res.user.user.level !== 1) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (_) {
        console.log(_)
        responser.error({ res, message: 'Sin permisos master' })
    }
}

module.exports = onlyMaster
