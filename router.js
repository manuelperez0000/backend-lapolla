const express = require('express')
const login = require('./api/login')
const welcome = require('./api/welcome')
const register = require('./api/register')
const listUsers = require('./api/listUsers')

const router = (app) => {
    const route = express.Router()
    app.use('/api/v1', route)
    route.get('/', welcome)
    route.use('/login', login)
    route.use('/register', register)
    route.use('/users', listUsers)
}

module.exports = router