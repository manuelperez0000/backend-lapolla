const { saveTransfer, getSendTransfers, getRecibeTransfers, approve } = require("../../db/controllers/transferController")

exports.transfer = async ({ from, to, amount, payMethod, ref }) => {
    return await saveTransfer({ from, to, amount, payMethod, ref })
}

exports.getSendTransfersById = async (_id) => await getSendTransfers(_id)

exports.getRecibeTransfersById = async (_id) => await getRecibeTransfers(_id)

exports.approveTransfer = async (_id) => await approve(_id,1)

exports.declineTransfer = async (_id) => await approve(_id,2)