const { compareTicketCode } = require("../../db/controllers/ticketController")


exports.getTicketCode = async () => {


    const getComparedCode = async () => {
        const digits = "23456789ACDEFGHJKLMPQRTUX"
        const randomDigit = () => digits[Math.floor((Math.random() * digits.length))]
        let ticketCode = ""
        for (let index = 1; index < 7; index++) {
            ticketCode += randomDigit()
        }
        const codeCompared = await compareTicketCode(ticketCode)
        if(codeCompared.length > 0) {
            getComparedCode()
        }
        else{
            return ticketCode
        }
    }

    return getComparedCode()

}