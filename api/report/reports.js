const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { getReports } = require('../../db/controllers/reportController')
const validate = require('../../services/validate')
const onlyStaf = require('../../midelwares/onlyStaf')
const validateToken = require('../../midelwares/validateToken')

router.get('/:id', validateToken, onlyStaf, async (req, res) => {
    try {
        const _id = req.params.id
        const reports = await getReports(_id)
        validate.required(reports.length > 0, "No se encontraron reportes")
        responser.success({ res, message: "success", body: reports })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

module.exports = router;