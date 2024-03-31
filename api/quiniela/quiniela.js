//creacion de una quiniela
const express = require('express')
const router = express.Router()
const responser = require('../../network/response')

router.get('/tickets', async (req, res) => {

    try {
        responser.success({ res, message: "success", body: "response" })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})


module.exports = router;



/* price
type
duration
pool
successes4
successes5
startDate
endDate
profitPercent
totalProfit */