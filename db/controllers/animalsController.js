const animalsModel = require('../models/animalsModel')

const saveAnimal = async (animal) => await animalsModel(animal).save()

const getAnimals = async () => await animalsModel.find()

const getFilteredAnimals = async ({ from, to }) => await animalsModel.find({ date: { "$gte": from, "$lt": to } }).sort({ $natural: -1 })

const animalsController = {
    saveAnimal,
    getAnimals,
    getFilteredAnimals
}

module.exports = animalsController