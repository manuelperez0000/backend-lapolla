const express = require('express')
const errors = require('./network/errors')
const route = express.Router()
const cors = require('cors')
const login = require('./api/user/login')
const welcome = require('./api/welcome')
const register = require('./api/user/register')
const listUsers = require('./api/user/listUsers')
const createBank = require('./api/bank/createBank')
const reset = require('./api/user/reset')
const deleteuser = require('./api/user/deleteuser')
const updateuser = require('./api/user/update')
const methods = require('./api/methods/methods')
const tickets = require('./api/tickets/tickets')

const router = (app) => {

    app.use(cors())
    app.use('/api/v1', route)
    route.use('/', welcome)
    route.use('/login', login)

    route.use('/register', register)
    route.use('/saveTicket', tickets)


    route.use('/users', listUsers)
    route.use('/createBank', createBank)
    route.use('/reset', reset)
    route.use('/admin/deleteuser', deleteuser)
    route.use('/admin/updateuser', updateuser)

    route.use('/admin/methods', methods)
    route.use(errors)
}

module.exports = router