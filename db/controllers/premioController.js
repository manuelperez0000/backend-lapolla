const Premio = require('../models/premiosModel')

const savePremio = async (premio) => await Premio(premio).save()

const premioControllers = {
    savePremio
}

module.exports = premioControllers;