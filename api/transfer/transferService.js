const { saveTransfer, getSendTransfers, getRecibeTransfers, approve, retransf,getTransfer } = require("../../db/controllers/transferController")

exports.transfer = async ({ from, to, amount, payMethod, ref }) => {
    return await saveTransfer({ from, to, amount, payMethod, ref })
}

exports.retransfer = async (payMethod, ref, retransferir) => await retransf(payMethod, ref, retransferir)

exports.getSendTransfersById = async (_id) => await getSendTransfers(_id)

exports.getRecibeTransfersById = async (_id) => await getRecibeTransfers(_id)

exports.getTransferById = async (_id) => await getTransfer(_id)

exports.approveTransfer = async (_id) => await approve(_id,1)

exports.declineTransfer = async (_id) => await approve(_id,2)