
const animalsModel = require('../models/animalsModel')

const saveAnimal = async (animals) => await animalsModel.insertMany(animals)

const getAnimals = async () => {
    try {
        /* const inicio = performance.now() */
        const res = await animalsModel.find().sort({ "hora": 1 })
        /* const fin = performance.now()
        const tiempoTotal = fin - inicio
        console.log("tiempoTotal", (Math.round(tiempoTotal / 1000)) + " s") */
        if (!res?.length === 0) {
            return res
        } else {
            return []
        }

    } catch (_) {
        return false
    }
}

const getFilteredAnimals = async ({ from, to }) => await animalsModel.find({ fecha: { "$gte": from, "$lt": to } }).sort({ "hora": 1 })

const deleteAnima = async (_id) => await animalsModel.findOneAndDelete({ _id })

const animalsController = {
    saveAnimal,
    getAnimals,
    getFilteredAnimals,
    deleteAnima
}

module.exports = animalsController