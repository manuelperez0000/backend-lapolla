const response = require('./response');

const errors = (_req,res) => {
    const message = "Error en la peticio: Endpoint invalido";
    response.error({ res, message })
}

module.exports = errors;