const express = require('express')
const router = express.Router()
const { saveAnimal, getAnimals,deleteAnima } = require('../../db/controllers/animalsController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const onlyAdminAndMaster = require('../../midelwares/onlyAdminAndMaster')
const validate = require('../../services/validate')

router.delete('/:id', validateToken, onlyAdminAndMaster, async (req, res) => {

    const animalId = req.params.id
    validate.required(animalId, "Id invalido")

    try {
        const response = await deleteAnima(animalId)

        console.log(response)

        responser.success({ res, message: "Eliminado con exito", body: response.data })
    } catch (error) {
        responser.error({ res, message: error.message || 'Error en la peticion para guardar un animal' })
    }


})

router.post('/', validateToken, async (req, res) => {
    const { name, animalId, owner, hora, fecha, roulet } = req.body
    const animal = {
        name,
        animalId,
        owner,
        hora,
        fecha,
        roulet
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