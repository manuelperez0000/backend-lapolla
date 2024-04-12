const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { getQuinielas } = require('../../db/controllers/quinielaController')

router.get('/', async (req, res) => {
    console.log("getQuinielas")
    try {
        const body = await getQuinielas()
        console.log(body)
        responser.success({ res, message: "success", body })
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