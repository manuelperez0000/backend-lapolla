const Premio = require('../models/premiosModel')

const savePremio = async (premio) => await Premio(premio).save()

const getPremio = async (_id) => await Premio.findOne({ _id })

const getPremios = async () => await Premio.find().limit(200).sort({ $natural: -1 })

const updatePremio = async (premio) => await Premio.findOneAndUpdate({ _id: premio._id }, premio)

const updatePremioRef = async ({ _id, ref, payerId }) => await Premio.findOneAndUpdate({ _id }, { $set: { ref, payerId,status:true } })

const premioControllers = {
    savePremio,
    getPremio,
    getPremios,
    updatePremio,
    updatePremioRef
}

module.exports = premioControllers;