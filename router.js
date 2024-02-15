const express = require('express')
const login = require('./api/user/login')
const welcome = require('./api/welcome')
const register = require('./api/user/register')
const listUsers = require('./api/user/listUsers')
const createBank = require('./api/bank/createBank')

const router = (app) => {
    const route = express.Router()
    app.use('/api/v1', route)
    route.get('/', welcome)
    route.use('/login', login)
    route.use('/register', register)
    route.use('/users', listUsers)
    route.use('/createBank', createBank)
}

module.exports = router