const { periodic } = require('robbi')

const granQuinielaWinners = require('./tareas/granQuinielaWinners')

const pollabot = () => {
    periodic({ s: 10 }, () => granQuinielaWinners())
}

module.exports = pollabot