const express = require('express')
const router = express.Router()
const responser = require('../../network/response')
const { createReport, getReports, deleteReport, verifyReport } = require('../../db/controllers/reportController')
const { getTickets } = require('../../db/controllers/ticketController')
const validate = require('../../services/validate')
const onlyStaf = require('../../midelwares/onlyStaf')
const onlyMaster = require('../../midelwares/onlyMaster')
const validateToken = require('../../midelwares/validateToken')

router.get('/', validateToken, onlyStaf, async (req, res) => {
    try {
        const reports = await getReports()
        validate.required(reports.length > 0, "No se encontraron reportes")
        responser.success({ res, message: "success", body: reports })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/', validateToken, onlyStaf, async (req, res) => {
    try {
        const { reportDate } = req.body

        validate.required(reportDate, "Fecha de reporte es requerida")

        const newFrom = reportDate + "T00:00:00.000+00:00"
        const newTo = reportDate + "T23:59:59.000+00:00"

        //obtener todos los tickets de ese dia reportDate
        const tickets = await getTickets({ from: newFrom, to: newTo })
        validate.required(tickets, "No se registraron ventas este dia")

        let totalSold = 0
        let adminAmount = 0
        let gruperoAmount = 0
        let agenciaAmount = 0
        let premio = 0
        let ticketsSold = tickets.length

        tickets.forEach(ticket => {
            totalSold += ticket.report.precioQuiniela || 0
            adminAmount += ticket.report.admin?.amount || 0
            gruperoAmount += ticket.report.grupero?.amount || 0
            agenciaAmount += ticket.report.agencia?.amount || 0
            premio += ticket.report.premio || 0
        })

        const data = {
            creationDate: newFrom,
            ticketsSold,
            totalSold,
            adminAmount,
            gruperoAmount,
            agenciaAmount,
            premio,
            homeBalance: totalSold - premio - adminAmount - gruperoAmount - agenciaAmount,
            userType: res.user.user.level,
            user: res.user.user
        }

        const body = await createReport(data)
        validate.required(body, "Ocurrio un error al crear el reporte")

        responser.success({ res, message: "Creado con exito", body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.post('/staf', validateToken, onlyStaf, async (req, res) => {
    try {

        const { date } = req.body

        const newFrom = date + "T00:00:00.000+00:00"
        const newTo = date + "T23:59:59.000+00:00"

        //obtener los reportes de este usuario con esta fecha

        const reportExist = await verifyReport(newFrom, res.user.user._id)
        console.log("fecha:", newFrom)
        console.log(reportExist)
        if (reportExist) {
            deleteReport(reportExist._id)
            //delete report reportExist._id
        }

        //obtener todos los tickets de ese dia reportDate
        const tickets = await getTickets({ from: newFrom, to: newTo })
        validate.required(tickets, "No se registraron ventas este dia")

        let totalSold = 0
        let adminAmount = 0
        let gruperoAmount = 0
        let agenciaAmount = 0
        let premio = 0
        let ticketsSold = tickets.length

        tickets.forEach(ticket => {
            totalSold += ticket.report.precioQuiniela || 0
            adminAmount += ticket.report.admin?.amount || 0
            gruperoAmount += ticket.report.grupero?.amount || 0
            agenciaAmount += ticket.report.agencia?.amount || 0
            premio += ticket.report.premio || 0
        })

        const data = {
            creationDate: newFrom,
            ticketsSold,
            totalSold,
            adminAmount,
            gruperoAmount,
            agenciaAmount,
            premio,
            homeBalance: totalSold - premio - adminAmount - gruperoAmount - agenciaAmount,
            userType: res.user.user.level,
            user: res.user.user
        }

        const body = await createReport(data)
        validate.required(body, "Ocurrio un error al crear el reporte")

        responser.success({ res, message: "Creado con exito", body })
    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

router.delete('/:id', validateToken, onlyMaster, async (req, res) => {

    try {
        const _id = req.params.id
        validate.required(_id, "Id es requerido")

        const deleted = await deleteReport(_id)
        validate.required(deleted.deletedCount > 0, "No se encontro ningun reporte para eliminar")

        responser.success({ res, message: "Eliminado con exito", body: deleted })

    } catch (error) {
        responser.error({ res, message: error.message || error })
    }
})

module.exports = router;