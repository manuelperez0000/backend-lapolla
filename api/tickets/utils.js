const { getLastActiveQuiniela } = require('../../db/controllers/quinielaController')
const getActiveQuiniela = async () => {

    const response = await getLastActiveQuiniela()
    if(response) return response._id
    return false

}

module.exports = getActiveQuiniela