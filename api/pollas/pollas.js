const express = require('express')
const router = express.Router()
/* const { required } = require('../../services/validate') */
const { getPollas } = require('./controller')
const responser = require('../../network/response')

router.get('/', async (req, res) => {

    try {
        const response = await getPollas()
        const mini = response?.mini >= 0 ? response.mini : 0
        const gran = response?.gran >= 0 ? response.gran : 0

        responser.success({ res, message: "success", body: { mini, gran } })
        
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;