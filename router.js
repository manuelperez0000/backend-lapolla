const express = require('express')
const login = require('./api/login')

const router = (app) => {
    const route = express.Router()
    app.use('/api/v1', route)
    route.use('/login', login)
}

module.exports = router