const express = require('express')
const router = express.Router()
const { saveAnimal, getAnimals, deleteAnima } = require('../../db/controllers/animalsController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const onlyAdminAndMaster = require('../../midelwares/onlyAdminAndMaster')
const { required, isMongoId } = require('../../services/validate')
const { getLastActiveGranQuinielaAndMini } = require('../../db/controllers/quinielaController')
const { getGanadores } = require('./animalServices')
const { finalizarQuiniela } = require('../../db/controllers/quinielaController')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { getFromTo } = require('../../services/utils')
const { from, to, fromMini, toMini } = getFromTo()
const { findTicketsByIdQuiniela } = require('../../db/controllers/ticketController')

router.delete('/:id', validateToken, onlyAdminAndMaster, async (req, res) => {

    const animalId = req.params.id
    required(animalId, "Id invalido")

    try {
        const response = await deleteAnima(animalId)

        console.log(response)

        responser.success({ res, message: "Eliminado con exito", body: response.data })
    } catch (error) {
        responser.error({ res, message: error?.message || 'Error en la peticion para guardar un animal' })
    }


})

router.post('/', validateToken, async (req, res) => {
    try {
        const { name, animalId, owner, hora, fecha, roulet } = req.body
        const newFecha = new Date(fecha)
        const _newFecha = newFecha.setHours(newFecha.getHours() - 4)

        const animal = {
            name,
            animalId,
            owner,
            hora,
            fecha: _newFecha,
            roulet
        }

        const response = await saveAnimal(animal)
        required(response)
        //obtener el id de la gran quiniela que esta en juego y la mini quiniela
        const activeQuinielas = await getLastActiveGranQuinielaAndMini()
        /* console.log("response bien", activeQuinielas) */
        required(activeQuinielas.length > 0, "No se encontraron quinielas activas")
        const granQuiniela = activeQuinielas.filter(i => i?.tipoQuiniela === 1)[0]
        const miniQuiniela = activeQuinielas.filter(i => i?.tipoQuiniela === 2)[0]

        const animals = await getFilteredAnimals({ from, to })
        const animalsMini = await getFilteredAnimals({ from: fromMini, to: toMini })
        const ticketsFindedGran = await findTicketsByIdQuiniela(granQuiniela._id)
        const ticketsFindedMini = await findTicketsByIdQuiniela(miniQuiniela._id)

        const ganadores5 = await getGanadores({ aciertos: 5, animals, ticketsFindedGran })
        const ganadores6 = await getGanadores({ aciertos: 6, animals, ticketsFindedGran })

        const ganadores3 = await getGanadores({ aciertos: 3, animalsMini, ticketsFindedMini })

        //comprarar todos los animalitos con los tickets
        console.log("ganadores 5 aciertos", ganadores5.length)
        console.log("ganadores 6 aciertos", ganadores6.length)
        console.log("ganadores 3 aciertos", ganadores3.length)

        //si hay uno o mas tickets con 6 asiertos cerrar la gran quiniela
        if (ganadores6.length >= 1) {
            const resFinalizar = await finalizarQuiniela(granQuiniela._id)
            console.log("Granquiniela fin: ", resFinalizar)
        }
        //si hay un ticket o mas con 3 animalitos cerrar la mini quiniela
        if (ganadores3.length >= 1) {
            const resFinalizar = await finalizarQuiniela(miniQuiniela._id)
            console.log("Miniquiniela fin: ", resFinalizar)
        }

        //crear un premio para cada uno de los ganadores
        //si el ganador es level 5 "cliente se le da el premio
        //si el ganador es level 4 es agencia y no se le da premio el premio espera por que 
        //la agencia rellene el metodo de pago y datos del ganador
        
        const userMethod = "000000000000000000000000"
        isMongoId(userMethod, 'Id invalido')

        //lista de tickets con 5 asiertos  //>>>>>>>>>>>>>>>>>>aqui voy
        /* ganadores5aciertos.forEach((ticket) => {
            //crear un preio
            const dataPremio = {
                user: ticket.user._id,
                userMethod,
                ticket: ticket._id
            }

            //createPremio(dataPremio)
        }) */


        responser.success({ res, message: "success", body: response.data })
    } catch (error) {
        responser.error({ res, message: error?.message || 'Error en la peticion para guardar un animal' })
    }
})

router.get('/', async (req, res) => {
    try {
        const body = await getAnimals()
        responser.success({ res, message: "success", body })
    } catch (error) {
        responser.error({ res, message: error?.message || 'Error en la peticion para obtener animales' })

    }
})

module.exports = router