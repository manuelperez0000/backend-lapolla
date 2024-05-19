const response = require('./response');

const errors = (_req,res) => {
    console.log("Error capturado en errors")
    const message = "Internal Error: error capturado al finalizar la aplicacion";
    response.error({ res, message })
}

module.exports = errors;