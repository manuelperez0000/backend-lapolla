
const animalsModel = require('../models/animalsModel')

const saveAnimal = async (animal) => await animalsModel(animal).save()

const getAnimals = async () => await animalsModel.find().sort({ "hora": 1 })

const getFilteredAnimals = async ({ from, to }) => await animalsModel.find({ fecha: { "$gte": from, "$lt": to } }).sort({ "hora": 1 })

const deleteAnima = async (_id) => await animalsModel.findOneAndDelete({ _id })

const animalsController = {
    saveAnimal,
    getAnimals,
    getFilteredAnimals,
    deleteAnima
}

module.exports = animalsController