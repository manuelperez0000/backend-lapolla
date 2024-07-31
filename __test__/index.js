/* eslint-disable no-undef */
const Chai = import('chai')
const animalService = require('../api/animals/animalServices')


describe('Para probar el servicio de isWinner', async () => {
    const { expect } = await Chai
    
    const animals = [{animalId:1},{animalId:2},{animalId:3},{animalId:4}]
    const aciertos = 2
    const ticket = { animals:[{id:1},{id:2}]}

    it('debería ser true', () => {
        expect(animalService.isWinner(ticket,animals,aciertos)).to.equal(true)
    })
})

















//const { getHoyCompletedString, getHour } = require('../services/utils')
/* describe('prueba de fechas del servidor', async () => {
    const { expect } = await Chai
    
    it('debería ser arrojar el mimo dia', () => {
        const fecha = getHoyCompletedString()
        expect(fecha).to.equal('2024-06-05T00:00:00.000+00:00')
    })

    it('deberia ser la misma hora', () => {
        const hora = getHour()
        expect(hora).to.equal(11)
    })
}) */


/* const validate = require('../services/validate')
describe('Pruebas a libreria validate', async () => {
    const { expect } = await Chai

    it('deberia ser verdadero', () => {
        expect(validate.email('manuel@gmail.com')).to.equal(true)
    })

    it('deberia ser falso', () => {

        const dataString = 'Error al validar email'
        const email = "dfkjdfkgjdfg"

        try {
            validate.email(email, dataString)
        } catch (error) {
            expect(error).to.equal(dataString + " " + email)
        }
    })

    it('deberia ser verdadero', () => {
        expect(validate.required(true)).to.equal(true)
    })
 
    it('se envia un array y se espera undefined', () => {
        expect(validate.required([1, 2, 3])).to.equal(undefined)
    })

    it('recibe un array y debe retornar error 2', () => {
        const message = "Error de validacion"
        try {
            validate.required([1, 1, false, 3], message)
        } catch (error) {
            expect(String(error)).to.equal("Error: " + message + " 2")
        }
    })

    it('recibe un null y retorna error' , () => {
        try {
            validate.required(null,"error")
        } catch (error) {
            expect(String(error)).to.equal("Error: error")
        }
    })
})
 */