const express = require('express')
const login = require('./api/user/login')
const welcome = require('./api/welcome')
const register = require('./api/user/register')
const listUsers = require('./api/user/listUsers')
const createBank = require('./api/bank/createBank')
const reset = require('./api/user/reset')
const errors = require('./network/errors')
const route = express.Router()
const cors = require('cors')
const router = (app) => {

    app.use(cors())
    app.use('/api/v1', route)
    route.get('/', welcome)
    route.use('/login', login)
    route.use('/register', register)
    route.use('/users', listUsers)
    route.use('/createBank', createBank)
    route.use('/reset', reset)
    route.use(errors)
}

module.exports = router