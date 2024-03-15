/* const fecha = require('../../../services/getDate') */
const tarea1 = () => {
    const date = new Date()
    const fecha = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    console.log(`tarea 1: ${fecha} `)
}

module.exports = tarea1