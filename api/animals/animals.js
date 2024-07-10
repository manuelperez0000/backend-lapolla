const express = require('express')
const router = express.Router()
const { saveAnimal, getAnimals, deleteAnima } = require('../../db/controllers/animalsController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const onlyAdminAndMaster = require('../../midelwares/onlyAdminAndMaster')
const { required } = require('../../services/validate')
const { getLastActiveGranQuinielaAndMini } = require('../../db/controllers/quinielaController')
const { getGanadores, pagarPorcentajeDeGananciaStaff } = require('./animalServices')
const { updateAndFinally } = require('../../db/controllers/quinielaController')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { getFromTo } = require('../../services/utils')
const { from, to, fromMini, toMini } = getFromTo()
const { findTicketsByIdQuiniela, setWinnerTicket } = require('../../db/controllers/ticketController')
const { savePremio } = require('../../db/controllers/premioController')
const config = require('../../config.json')
const { icreaseUserBalance } = require('../../db/controllers/userController')

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

router.post('/', validateToken, onlyAdminAndMaster, async (req, res) => {
    try {
        //const { name, animalId, owner, hora, fecha, roulet } = req.body

        const { owner, animalRuletaActiva, animalGranjita, animalLotoActivo, hora, fecha } = req.body

        required([owner, animalRuletaActiva, animalGranjita, animalLotoActivo, hora, fecha])

        /* {
            owner: user._id,
                animalRuletaActiva: animalSelected,
                    animalGranjita: animalSelected2,
                        animalLotoActivo: animalSelected3,
                            hora: hora,
                                fecha: inputDate + ' ' + hora + ':00:00',
   
        } */

        const newFecha = new Date(fecha)
        const _newFecha = newFecha.setHours(newFecha.getHours() - 4)

        const animalsToSave = [
            {
                name:animalRuletaActiva.name,
                animalId:animalRuletaActiva.id,
                owner,
                hora,
                fecha: _newFecha,
                roulet:1
            },
            {
                name:animalGranjita.name,
                animalId:animalGranjita.id,
                owner,
                hora,
                fecha: _newFecha,
                roulet:2
            },
            {
                name:animalLotoActivo.name,
                animalId:animalLotoActivo.id,
                owner,
                hora,
                fecha: _newFecha,
                roulet:3
            }
        ]

        //obtener el id de la gran quiniela que esta en juego y la mini quiniela
        const activeQuinielas = await getLastActiveGranQuinielaAndMini()
        required(activeQuinielas.length > 0, "quinielas finalizadas, proxima a partir de las 9:00 AM")

        const response = await saveAnimal(animalsToSave)
        required(response)

        const granQuiniela = activeQuinielas.filter(i => i?.tipoQuiniela === 1)[0]
        const miniQuiniela = activeQuinielas.filter(i => i?.tipoQuiniela === 2)[0]
        const animals = await getFilteredAnimals({ from, to })
        const animalsMini = await getFilteredAnimals({ from: fromMini, to: toMini }) //hacer filtrado inteligente
        const idQuiniela = granQuiniela?._id

        console.log(animalsMini?.map(i => i.animalId))
        const ticketsFindedGran = await findTicketsByIdQuiniela(idQuiniela)
        const ticketsFindedMini = await findTicketsByIdQuiniela(miniQuiniela?._id)

        const ganadores5 = await getGanadores({ aciertos: 5, animals, ticketsFinded: ticketsFindedGran })
        const ganadores6 = await getGanadores({ aciertos: 6, animals, ticketsFinded: ticketsFindedGran })
        const ganadores4 = await getGanadores({ aciertos: 4, animals: animalsMini, ticketsFinded: ticketsFindedMini })

        //comprarar todos los animalitos con los tickets
        //si hay uno o mas tickets con 6 asiertos cerrar la gran quiniela

        //crear un premio para cada uno de los ganadores
        const precioGranQuiniela = config.precioGranQuiniela
        const precioMiniQuiniela = config.precioMiniQuiniela
        const porcentajePremio = config.porcentajePremio
        const premio5aciertos = config.premio5aciertos
        const premio6aciertos = config.premio6aciertos

        //si el ganador es level 5:cliente se le da el premio
        //si el ganador es level 4 es agencia y no se le da premio el premio espera por que 
        //la agencia rellene el metodo de pago y datos del ganador

        if (ganadores6.length >= 1) {
            const acumulado = 0
            const winners = [...ganadores5, ...ganadores6]

            ganadores5.forEach(ticket => {
                const amount = ticketsFindedGran.length * precioGranQuiniela * porcentajePremio * premio5aciertos / ganadores5.length
                const user = ticket.user
                if (user.level === 4) {
                    //pagar las comisiones a las agencias, gruperos y administradores
                    pagarPorcentajeDeGananciaStaff(ticket)
                    savePremio({ ticket, amount, acierots: 5 })
                } else {
                    icreaseUserBalance({ _id: user._id, balance: amount })
                }
                setWinnerTicket(ticket._id)
            })

            ganadores6.forEach(ticket => {
                const amount = ticketsFindedGran.length * precioGranQuiniela * porcentajePremio * premio6aciertos / ganadores5.length
                const user = ticket.user
                if (user.level === 4) {
                    //pagar las comisiones a las agencias, gruperos y administradores
                    pagarPorcentajeDeGananciaStaff(ticket)
                    savePremio({ ticket, amount, acierots: 6 })
                } else {
                    icreaseUserBalance({ _id: user._id, balance: amount })
                }
                setWinnerTicket(ticket._id)
            })

            updateAndFinally(granQuiniela._id, winners, animals, ganadores5.length, ganadores6.length, acumulado)
        }

        //si hay un ticket o mas con 3 animalitos cerrar la mini quiniela
        if (ganadores4.length > 0) {
            const acumulado = 0
            const winners = ganadores4

            updateAndFinally(miniQuiniela._id, winners, animals, 0, ganadores4.length, acumulado)

            ganadores4.forEach(ticket => {
                const amount = ticketsFindedMini.length * precioMiniQuiniela * porcentajePremio / ganadores4.length
                const user = ticket.user
                if (user.level === 4) {
                    //pagar las comisiones a las agencias, gruperos y administradores
                    pagarPorcentajeDeGananciaStaff(ticket)
                    savePremio({ ticket, amount, acierots: 6 })
                } else {
                    icreaseUserBalance({ _id: user._id, balance: amount })
                }
                setWinnerTicket(ticket._id)
            })
        }

        responser.success({ res, message: "success", body: response })
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