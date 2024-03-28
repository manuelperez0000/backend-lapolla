const express = require('express')
const router = express.Router()
const { saveAnimal, getAnimals } = require('../../db/controllers/animalsController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')

router.post('/', validateToken, async (req, res) => {
    const { body } = req
    const animal = {
        name: body.name,
        animalId: body.animalId,
        date: body.date,
        owner: body.owner,
        hora: body.hora,
        roulet: body.roulet,
    }

    try {
        const response = await saveAnimal(animal)

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