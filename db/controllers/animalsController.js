const animalsModel = require('../models/animalsModel')

const saveAnimal = async (animal) => await animalsModel(animal).save()

const getAnimals = async () => await animalsModel.find()

const ticketController = {
    saveAnimal,
    getAnimals
}

module.exports = ticketController