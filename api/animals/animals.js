const express = require('express')
const router = express.Router()
const { saveAnimal, getAnimals } = require('../../db/controllers/animalsController')
const responser = require('../../network/response')
const date = require('../../services/getDate')
const validateToken = require('../../midelwares/validateToken')

router.post('/', validateToken, async (req, res) => {
    const animal = req.body
    animal.date = date()

    try {
        const response = await saveAnimal(animal)
        console.log(response)
        responser.success({ res, message: "success", body: response.data })
    } catch (error) {
        responser.error({ res, message: error.message || 'Error en la peticion para guardar un animal' })
    }
})

router.get('/', async (req, res) => {
    try {
        const body = await getAnimals()
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error.message || 'Error en la peticion para obtener animales' })

    }
})

module.exports = router