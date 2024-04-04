const { periodic, spesific } = require('robbi')
const granQuinielaWinners = require('./tareas/granQuinielaWinners')

const pollabot = () => { spesific({ h: 9 }, () => granQuinielaWinners()) }
/* const pollabot = () => { periodic({ s: 10 }, () => granQuinielaWinners()) } */

module.exports = pollabot