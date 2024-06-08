const express = require('express');
const validateToken = require('../../midelwares/validateToken');
const onlyMaster = require('../../midelwares/onlyMaster');
const router = express.Router()
const { User } = require('../../db/controllers/userController')
const responser = require('../../network/response')

router.get('/1', validateToken, onlyMaster, async (_req, res) => {

    try {
        const body = await User.updateMany({}, { block: false, deleted: false })
        console.log(body)
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }

})

module.exports = router;