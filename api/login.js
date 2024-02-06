const express = require('express')
const router = express.Router()
const User = require('./models/userModel')

router.get('/', async (req, res) => {
    try {
        const response = await User.find()
        res.json({ message: 'success', status: true, body: response })
    } catch (error) {
        res.json({ message: 'Ocurrio un error de comunicacion con la base de datos', status: false })
    }
})

module.exports = router;