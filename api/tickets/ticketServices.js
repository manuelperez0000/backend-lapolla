/* eslint-disable no-undef */
const { compareTicketCode } = require("../../db/controllers/ticketController")
const { getUser } = require("../../db/controllers/userController")
const config = require('../../config.json')
exports.getTicketCode = async () => {
    const getComparedCode = async () => {
        const digits = "23456789ACDEFGHJKLMPQRTUX"
        const randomDigit = () => digits[Math.floor((Math.random() * digits.length))]
        let ticketCode = ""
        for (let index = 1; index < 7; index++) {
            ticketCode += randomDigit()
        }
        const codeCompared = await compareTicketCode(ticketCode)
        if (codeCompared.length > 0) {
            getComparedCode()
        }
        else {
            return ticketCode
        }
    }

    return getComparedCode()
}

exports.pagarTodos = async (precioQuiniela, userLevel, icreaseUserBalance, adminData, gruperoData, agencia) => {

    if (userLevel === 4) {
        if (!adminData && !gruperoData) return //seria cliente : asegurar que los staff no agreguen clientes

        let admin = {}
        let adminPercent = 0
        let gruperoPercent = 0
        let masterPercent = 20

        if (gruperoData) {
            const _admin = await getUser(gruperoData.admin)
            admin = _admin
            adminPercent = _admin.percent
            gruperoPercent = gruperoData.percent
        } else if (adminData) {
            adminPercent = adminData.percent
        }

        const calcAdminPercent = adminPercent - gruperoPercent
        const calcGruperoPercent = gruperoPercent - agencia.percent
        const calcMasterPercent = masterPercent - calcAdminPercent - calcGruperoPercent - agencia.percent

        console.log("Agencia: " + (agencia.percent))
        console.log("Admin: " + (calcAdminPercent))
        console.log("Grupero: " + (calcGruperoPercent))
        console.log("Master: " + (calcMasterPercent))
        console.log("total: " + (calcAdminPercent + calcGruperoPercent + calcMasterPercent + agencia.percent))

        const _agenciaAmount = precioQuiniela * agencia.percent / 100
        const _agenciaPercent = agencia.percent

        const _adminAmount = precioQuiniela * calcAdminPercent / 100
        const _adminPercent = calcAdminPercent
        const _adminId = admin._id

        const _gruperoAmount = precioQuiniela * calcGruperoPercent / 100
        const _gruperoPercent = calcGruperoPercent

        const _masterAmount = precioQuiniela * calcMasterPercent / 100
        const _masterPercent = calcMasterPercent

        if (_adminAmount > 0 && adminData?._id) icreaseUserBalance({ _id: adminData._id, balance: _adminAmount })
        if (_gruperoAmount > 0 && gruperoData?._id) icreaseUserBalance({ _id: gruperoData._id, balance: _gruperoAmount })
        //no se le va a subir el monto al master
        if (_masterAmount > 0 && process.env.ADMINID) icreaseUserBalance({ _id: process.env.ADMINID, balance: _masterAmount })

        return {
            precioQuiniela,
            agencia: {
                amount: _agenciaAmount,
                percent: _agenciaPercent,
                _id: agencia?._id
            },
            admin: {
                amount: _adminAmount,
                percent: _adminPercent,
                _id: _adminId
            },
            grupero: {
                amount: _gruperoAmount,
                percent: _gruperoPercent,
                _id: agencia?.grupero
            },
            master: {
                amount: _masterAmount,
                percent: _masterPercent,
                _id: process.env.ADMINID,
            },
            premio: config.porcentajePremio * precioQuiniela
        }

    }

}

