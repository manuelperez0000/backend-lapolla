/* eslint-disable no-undef */
const Chai = import('chai')
const { getHoyCompletedString, getHour } = require('../services/utils')
describe('prueba de fechas del servidor', async () => {
    const { expect } = await Chai
    
    it('debería ser arrojar el mimo dia', () => {
        const fecha = getHoyCompletedString()
        expect(fecha).to.equal('2024-06-05T00:00:00.000+00:00')
    })

    it('deberia ser la misma hora', () => {
        const hora = getHour()
        expect(hora).to.equal(11)
    })
})
