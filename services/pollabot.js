const cron = require('node-cron')
/* const date = new Date()
const time = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    inicioDeJugadas: Date.now(),
    finalDeJugadas: Date.now() + 86400000,
    now: Date.now()
}

const startNewQuiniela = () => {
    //consultar si existe una quiniela activa en este momento
    //obtener el objeto time de la quiniela
    //si tiene la hora 
    console.log("iniciando nueva quiniela")
}

if (time.hours > 9) {
    startNewQuiniela()
} else {
    console.log("quiniela activa")
    //meto la venta en esa quiniela activa
} */
/* 
console.log(time)
const pollito = {
    date,
    time,
    startNewQuiniela
}

module.exports = pollito */

const chainTime = {
    minute: '* * * * *',
    hour: '*/60 * * * *'
}

const tarea = () => {
    const date = new Date()
    console.log(`Pollabot: ${date.getHours()}:${date.getMinutes()}:${String(date.getSeconds()).padStart(2, '0')}`)
    console.log('Tarea ejecutada periódicamente ')
}

const pollabot = () => cron.schedule(chainTime.hour, tarea)


module.exports = pollabot