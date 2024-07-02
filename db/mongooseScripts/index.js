const User = require('../models/userModel')
const mongoose = require('mongoose')
const scripts = () => {

    User.updateMany({}, { balance: 0 })
        .then(() => {
            console.log('Documentos actualizados correctamente')
            mongoose.disconnect(); // Desconectar de la base de datos
        })
        .catch(error => {
            console.error('Error al actualizar los documentos:', error)
            mongoose.disconnect(); // Desconectar de la base de datos en caso de error
        })
}

module.exports = scripts



