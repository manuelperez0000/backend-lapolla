const express = require('express')
const router = express.Router()
const responser = require('../network/response')
const { saveUser } = require('../db/controllers/userController')

//obtener un retiro por su id
router.get('/', async (req, res) => {
  try {

    const user = {
      "name": "Pollabotx",
      "email": "pollabot@gmail.com",
      "ci": "123456784",
      "password": "123456",
      "phone": "04141234567",
      "repassword": "123456",
      "admin":"66207f0edf3abd9ae2cb076d",
      "grupero":"66207f0edf3abd9ae2cb076d"
    }

    const res2 = await saveUser(user)

    responser.success({ res, message: "Cron ejecutado", body: res2 })
  } catch (error) {
    responser.error({ res, message: error?.message || error })
  }
})

module.exports = router

