
const animalsModel = require('../models/animalsModel')

const saveAnimal = async (animals) => await animalsModel.insertMany(animals)

const getAnimals = async () => {
    const res = await animalsModel.find().sort({ "hora": 1 })
    /* const res = [1,2.3] */
    if(!res?.length === 0){
        return res
    }else{
        return []
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