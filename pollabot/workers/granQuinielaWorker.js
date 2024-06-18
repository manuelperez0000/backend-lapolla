const { getGanadores } = require('../../api/animals/animalServices')
const { savePremio } = require('../../db/controllers/premioController')
const { getFilteredAnimals } = require('../../db/controllers/animalsController')
const { getAyerGranQuiniela, finalizarQuiniela } = require('../../db/controllers/quinielaController')
const { findTicketsByIdQuiniela, setWinerTicket } = require('../../db/controllers/ticketController')
const { icreaseUserBalance } = require('../../db/controllers/userController')
const { getFromTo } = require('../../services/utils')
const { setPremioAcumuladoGran } = require('../../db/controllers/configController')
const crearQuinielaNueva = require('../crearQuinielaNueva')
const { countDocuments } = require('../../db/controllers/quinielaController')
const { from, to } = getFromTo()

const apagarGranQuinielaAnterior = async () => {
    //obtener la granquiniela de ayer
    const ayerQuiniela = await getAyerGranQuiniela()
    const granQuinielaAyer = ayerQuiniela[0]

    //revisar si esta apagada
    const activada = granQuinielaAyer.status
    //si esta apagada no hacer nada
    if (activada) {
        //si esta encendida apagar
        const resultDesactivar = await finalizarQuiniela(granQuinielaAyer._id)
        console.log(resultDesactivar)
        //buscar ganadores
        const animals = await getFilteredAnimals({ from, to })
        const ticketsFindedGran = await findTicketsByIdQuiniela(granQuinielaAyer._id)

        const ganadores5 = await getGanadores({ aciertos: 5, animals, ticketsFindedGran })
        //obtener todos los tickets de esta quiniela y ver si hay ganadores
        const premioTotal = 25 * ticketsFindedGran.length * 0.8 * 0.3
        const premio = premioTotal / ganadores5.length

        if (ganadores5.length > 0) {

            const pagoDeClientes = (ticket) => {
                const userId = ticket.user._id
                setWinerTicket(ticket._id)
                icreaseUserBalance({ _id: userId, balance: premio })
            }

            const pagoDeAgencias = (ticket) => {
                //generar un premio
                const idTicket = ticket._id
                const idAgencia = ticket.user._id
                savePremio({ idTicket, agencia: idAgencia, amount: premio })
            }

            ganadores5.forEach(ticket => {
                if (ticket.user.level === 5) pagoDeClientes(ticket)
                if (ticket.user.level === 4) pagoDeAgencias(ticket)
            })
        } else {

            //si no se consigue ganador: acumular premio
            setPremioAcumuladoGran(premioTotal)
        }
    }

    //iniciar nueva quiniela
    const count = await countDocuments()
    crearQuinielaNueva({ type: 1, count })
}

module.exports = {
    apagarGranQuinielaAnterior
}
