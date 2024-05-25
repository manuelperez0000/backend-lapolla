const responser = require('../network/response')

const onlyMaster = (_req, res, next) => {
    try {
        console.log(res.user.user)
        if (res.user.user.level !== 1) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos master' })
    }
}

const onlyStaf = (_req, res, next) => {
    try {
        console.log(res.user)

        if (res.user.user.level < 5) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos staff' })
    }
}

const onlyAdmin = (_req, res, next) => {
    try {
        console.log(res.user.user)
        if (res.user.user.level !== 2) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos admin' })
    }
}

const onlyGrupero = (_req, res, next) => {
    try {
        console.log(res.user.user)
        if (res.user.user.level !== 3) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos grupero' })
    }
}

const onlyAgencia = (_req, res, next) => {
    try {
        console.log(res.user.user)
        if (res.user.user.level !== 4) throw 'No posee los permisos para acceder a esta funcionalidad'
        next()
    } catch (error) {
        responser.error({ res, message: 'Sin permisos agencia' })
    }
}

module.exports = onlyMaster
