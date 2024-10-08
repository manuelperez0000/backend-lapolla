const { required, isMongoId, objectEmpty } = require('../../services/validate')
const { transfer, retransfer } = require('../transfer/transferService')
const { createPago, getPagos, getPagosTo } = require('../../db/controllers/pagoQuinielaController')

exports.savePago = async (data) => {

    const { from, to, amount, payMethod, ref, idQuiniela, retransferir } = data

    required([from, to, amount, payMethod, ref, idQuiniela], "Error en los datos del formulario")
    isMongoId([from, to, payMethod, idQuiniela], "Formato invalido, uno de los datos proporcionados no es compatible con mongodb")

    required(from !== to, "Error, no se puede ejecutar una transferencia a tu misma cuenta")

    if (!retransferir) {

        const resultTransfer = await transfer({ from, to, amount, payMethod, ref })
        required(!objectEmpty(resultTransfer), "Ocurrio un error al guardar el pago")

        const datosPago = {
            idAgencia: from,
            idQuiniela,
            idTransfer: resultTransfer
        }

        const resultPago = await createPago(datosPago)
        required(!objectEmpty(resultPago))
        return { resultPago, resultTransfer }

    } else {
        //updateTransfer
       /*  console.log("retransferir: ", retransferir) */
        const resultTransfer = await retransfer(payMethod, ref, retransferir)
        return { resultTransfer }
    }
}

exports.getPaydQuinielas = async (idUser) => await getPagos(idUser)

exports.getPaydQuinielasTo = async (idUser) => await getPagosTo(idUser)


