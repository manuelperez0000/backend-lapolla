const responser = require('../network/response')
const onlyMaster = (_req, res, next) => {
    try {
        console.log(res.user.user)
        if (res.user.user.level !== 1) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos' })
    }
}
module.exports = onlyMaster