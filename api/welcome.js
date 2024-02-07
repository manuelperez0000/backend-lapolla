//pagina de inicio en la api
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => { res.status(200).send('API de apuestaslapolla.com')})

module.exports = router;