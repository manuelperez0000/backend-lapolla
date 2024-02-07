const express = require('express')
const login = require('./api/login')
const register = require('./api/register')
const welcome = require('./api/welcome')
const listUsers = require('./api/listUsers')

const router = (app) => {
    const route = express.Router()
    app.use('/api/v1', route)
    route.get('/', welcome)
    route.use('/', login)
    route.use('/', register)
    route.use('/', listUsers)
}

module.exports = router