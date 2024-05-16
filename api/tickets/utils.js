const { getLastActiveQuiniela } = require('../../db/controllers/quinielaController')
const getActiveQuiniela = async () => {

    const response = await getLastActiveQuiniela()
    console.log("id de la quiniela: "+response._id)
    return response._id

}

module.exports = getActiveQuiniela