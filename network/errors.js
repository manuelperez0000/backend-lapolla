const response = require('./response');

const errors = (req,res) => {
    console.log("Error capturado en errors")
    const message = "Internal Error 2";
    response.error({ res, message })
}

module.exports = errors;