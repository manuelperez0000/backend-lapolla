const { updateGranQuiniela } = require('../../../db/controllers/quinielaController')
const updateQuiniela = async ({ winners, idNuevaQuiniela, resultAnimals }) => {
    await updateGranQuiniela({ _id: idNuevaQuiniela, winners, resultAnimals })
}

module.exports = updateQuiniela