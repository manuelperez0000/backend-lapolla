const { required, number } = require("../../services/validate")

const getGanadores = async ({ aciertos, animals, ticketsFinded }) => {
    try {
        required([aciertos, animals, ticketsFinded])
        number(aciertos, "Aciertos debe ser un numero")
        const idsAnimals = animals.map(i => i.animalId)
        return ticketsFinded.filter(ticket =>
            ticket.animals.filter(animal =>
                idsAnimals.includes(animal.id)).length === aciertos ? true : false)
    } catch (error) {
        console.log(error)
    }
}
 
module.exports = {
    getGanadores
}