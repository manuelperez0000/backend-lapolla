
const animalsModel = require('../models/animalsModel')

const saveAnimal = async (animal) => await animalsModel(animal).save()

const getAnimals = async () => await animalsModel.find()

const getFilteredAnimals = async ({ from, to }) => await animalsModel.find({ fecha: { "$gte": from, "$lt": to } })

const animalsController = {
    saveAnimal,
    getAnimals,
    getFilteredAnimals
}

module.exports = animalsController