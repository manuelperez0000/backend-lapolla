const { updateGranQuiniela, finalizarQuiniela } = require('../../../db/controllers/quinielaController')
const updateQuiniela = async ({ winners, idNuevaQuiniela, resultAnimals }) => {
    return await updateGranQuiniela({ _id: idNuevaQuiniela, winners, resultAnimals })
}

const closeQuiniela = async (_id) => {
    return await finalizarQuiniela(_id)
}

const $ = {
    updateQuiniela,
    closeQuiniela
}

module.exports = $