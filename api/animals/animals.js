/* const round = (num) => Math.round(num * 100) / 100 */
const express = require('express')
const router = express.Router()
const { saveAnimal, getAnimals, deleteAnima } = require('../../db/controllers/animalsController')
const responser = require('../../network/response')
const validateToken = require('../../midelwares/validateToken')
const onlyAdminAndMaster = require('../../midelwares/onlyAdminAndMaster')
const { required } = require('../../services/validate')
const { getLastActiveGranQuinielaAndMini, updateAnimals } = require('../../db/controllers/quinielaController')
const { getGanadores, getMontoGranQuiniela, getMontoMiniQuiniela, getArrayAnimalsToSave } = require('./animalServices')
const { updateAndFinally } = require('../../db/controllers/quinielaController')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { getFromTo } = require('../../services/utils')
const { from, to, fromMini, toMini } = getFromTo()
const { findTicketsByIdQuiniela, setGanadores, setPerdedores, setTicketPagado } = require('../../db/controllers/ticketController')
/* const { savePremio } = require('../../db/controllers/premioController') */
const config = require('../../config.json')
const { icreaseUserBalance } = require('../../db/controllers/userController')

const { getConfig, updateConfig } = require('../../db/controllers/configController')

router.delete('/:id', validateToken, onlyAdminAndMaster, async (req, res) => {

    const animalId = req.params.id
    required(animalId, "Id invalido")

    try {
        const response = await deleteAnima(animalId)

        /*   console.log(response) */

        responser.success({ res, message: "Eliminado con exito", body: response.data })
    } catch (error) {
        responser.error({ res, message: error?.message || 'Error en la peticion para guardar un animal' })
    }
})

router.post('/', validateToken, onlyAdminAndMaster, async (req, res) => {
    try {

        const { owner, animalRuletaActiva, animalGranjita, animalLotoActivo, hora, fecha } = req.body
        required([owner, animalRuletaActiva, animalGranjita, animalLotoActivo, hora, fecha])

        const newFecha = new Date(fecha)
        const _newFecha = newFecha.setHours(newFecha.getHours() - 4)

        const animalsToSave = getArrayAnimalsToSave({ owner, hora, animalRuletaActiva, _newFecha, animalGranjita, animalLotoActivo })

        //obtener el id de la gran quiniela que esta en juego y la mini quiniela
        const activeQuinielas = await getLastActiveGranQuinielaAndMini()
        required(activeQuinielas?.length > 0, "quinielas finalizadas, proxima a partir de las 9:00 AM")
        const response = await saveAnimal(animalsToSave)
        required(response, "No se pudo guardar los animalitos")

        //guardar este resultado en quiniela, agregar
        const granQuiniela = activeQuinielas.filter(i => i?.tipoQuiniela === 1)[0]
        const miniQuiniela = activeQuinielas.filter(i => i?.tipoQuiniela === 2)[0]
        const animals = await getFilteredAnimals({ from, to })
        const animalsMini = await getFilteredAnimals({ from: fromMini, to: toMini }) //hacer filtrado inteligente

        //obtener el id de la quiniela corespondiente teniendo presente que mini y
        // gran deben ser afectadas por igual de acuerdo a la hora

        updateAnimals({ _id: granQuiniela?._id, resultAnimals: animals })
        updateAnimals({ _id: miniQuiniela?._id, resultAnimals: animalsMini })

        //required([responseUpdateGran, responseUpdateMini],'Error al actualizar los animales en la quiniela')

        const ticketsFindedGran = await findTicketsByIdQuiniela(granQuiniela?._id)

        const ticketsFindedMini = await findTicketsByIdQuiniela(miniQuiniela?._id)

        const precioGranQuiniela = config.precioGranQuiniela
        const precioMiniQuiniela = config.precioMiniQuiniela
        const porcentajePremio = config.porcentajePremio
        const premio5aciertos = config.premio5aciertos
        const premio6aciertos = config.premio6aciertos
        const premioGranQuiniela = config.premioGranQuiniela
        const premioMiniQuiniela = config.premioMiniQuiniela

        //******************************************************************************************** */
        //obtener los premios acumulados //*********************************************************** */
        const configData = await getConfig()
        const acumuladoGranQuiniela = configData.premioAcumuladoGran
        const acumuladoMiniQuiniela = configData.premioAcumuladoMini
        //******************************************************************************************** */

        const ganadores6 = getGanadores({ aciertos: 6, animals, ticketsFinded: ticketsFindedGran })
        const ganadores5 = getGanadores({ aciertos: 5, animals, ticketsFinded: ticketsFindedGran })
        const ganadores4 = getGanadores({ aciertos: 4, animals: animalsMini, ticketsFinded: ticketsFindedMini })

        console.log("ganadores 4:", ganadores4)
        console.log("abnimalsMini:", animalsMini)
        console.log("ticketsFindedMini:", ticketsFindedMini)

        //mini quiniela

        const montoPremioGranQuiniela6 = getMontoGranQuiniela({
            ganadores: ganadores6,
            cantidadTickets: ticketsFindedGran.length,
            precioQuiniela: precioGranQuiniela,
            premioGranQuiniela,
            porcentajePremio,
            premio: premio6aciertos,
            acumulado: acumuladoGranQuiniela
        })

        const montoPremioGranQuiniela5 = getMontoGranQuiniela({
            ganadores: ganadores5,
            cantidadTickets: ticketsFindedGran.length,
            precioQuiniela: precioGranQuiniela,
            porcentajePremio,
            premioGranQuiniela,
            premio: premio5aciertos,
            acumulado: acumuladoGranQuiniela
        })

        const montoPremioMiniQuiniela = getMontoMiniQuiniela({
            cantidadTickets: ticketsFindedMini.length,
            ganadores: ganadores4,
            precioQuiniela: precioMiniQuiniela,
            porcentajePremio,
            premioMiniQuiniela,
            acumulado: acumuladoMiniQuiniela
        })

        /*   console.log("montoPremioGranQuiniela5: ", montoPremioGranQuiniela5)
          console.log("montoPremioGranQuiniela6: ", montoPremioGranQuiniela6)
          console.log("montoPremioMiniQuiniela: ", montoPremioMiniQuiniela) */


        //const montoPremioGranQuiniela5 = ganadores5?.length > 0 ? (ticketsFindedGran.length * precioGranQuiniela * porcentajePremio * premio5aciertos / ganadores5.length + (acumuladoGranQuiniela * premio5aciertos / ganadores5.length)).toFixed(2) : 0

        const pagoPremio = ({ user, monto, ticket }) => {
            /*   console.log("monto:", round(monto)) */
            if (user.level === 4) {
                setTicketPagado(ticket)
                //savePremio({ ticket, amount: monto, aciertos })
            } else {
                icreaseUserBalance({ _id: user._id, balance: monto })
            }
        }

        if (ganadores6.length >= 1) {
            const estructuraDeGanadore = { ganadores5: [], ganadores6: [], perdedores: [] }
            ticketsFindedGran.forEach(ticket => {
                //recorrer cada ticket y evaluar si es ganador con 5 asiertos, 6 asiertos o perdedor
                const animalsGranQuiniela = animals.map(a => a.animalId)
                const getAciertos = ticket.animals.filter(animal => animalsGranQuiniela.includes(animal.id))
                const aciertos = getAciertos.length
                const { user } = ticket

                /*  console.log("aciertos: ", aciertos) */

                if (aciertos === 6) {
                    estructuraDeGanadore.ganadores6.push(ticket)
                    pagoPremio({ user, monto: montoPremioGranQuiniela6, ticket, aciertos })
                } else if (aciertos === 5) {
                    estructuraDeGanadore.ganadores5.push(ticket)
                    pagoPremio({ user, monto: montoPremioGranQuiniela5, ticket, aciertos })
                } else {
                    estructuraDeGanadore.perdedores.push(ticket)
                }
            })
            //editar todos los tickets a ganador o perdedor
            const idTicketsGanadores = [...estructuraDeGanadore.ganadores5, ...estructuraDeGanadore.ganadores6].map(i => i._id)
            setGanadores(idTicketsGanadores)
            const idTicketsPerdedores = estructuraDeGanadore.perdedores.map(i => i._id)
            setPerdedores(idTicketsPerdedores)

            //resetear premio acumulado
            updateConfig({ premioAcumuladoGran: 0 })
            //cerrar la quiniela
            const xx = await updateAndFinally(granQuiniela._id, estructuraDeGanadore.ganadores5.length + estructuraDeGanadore.ganadores6.length, animals, estructuraDeGanadore.ganadores5.length, estructuraDeGanadore.ganadores6.length, 0)
            /* console.log("Update and finally: ",xx) */
        }



        /*888888888888888888888888888888888888888888888****************************************/
        /*888888888888888888888888888888888888888888888****************************************/

        //error en balance

        /*888888888888888888888888888888888888888888888****************************************/

        if (ganadores4.length > 0) {

            console.log("GANADORES POSITIVOooooooooooooooooooooooooooooooo")

            const estructuraDeGanadores = { ganadoresMiniQuiniela: [], perdedores: [] }

            ticketsFindedMini.forEach((ticket) => {
                const animalsMiniQuiniela = animalsMini.map(a => a.animalId)
                const getAciertos = ticket.animals.filter(animal => animalsMiniQuiniela.includes(animal.id))
                const aciertos = getAciertos.length
                const { user } = ticket
                if (aciertos === 4) {
                    estructuraDeGanadores.ganadoresMiniQuiniela.push(ticket)
                    pagoPremio({ user, monto: montoPremioMiniQuiniela, ticket, aciertos })
                } else {
                    estructuraDeGanadores.perdedores.push(ticket)
                }
            })

            const idTicketsGanadoresMini = [...estructuraDeGanadores.ganadoresMiniQuiniela].map(i => i._id)
            const idTicketsPerdedoresMini = [...estructuraDeGanadores.perdedores].map(i => i._id)

            console.log("Ganadores mini >>>>>>>>>>: ", idTicketsGanadoresMini)

            setGanadores(idTicketsGanadoresMini)
            setPerdedores(idTicketsPerdedoresMini)
            updateConfig({ premioAcumuladoMini: 0 })

            //si hay un ticket o mas con 4 animalitos cerrar la mini quiniela
            updateAndFinally(miniQuiniela._id, estructuraDeGanadores.ganadoresMiniQuiniela, animalsMini, 0, estructuraDeGanadores.ganadoresMiniQuiniela.length, 0)
        }

        responser.success({ res, message: "success", body: "response" })
    } catch (error) {
        console.log(error)
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