const response = require('./response');

const errors = (err, res) => {
    console.log(err);
    const message = err.message || "Internal Error";
    response.error({ res, message })
}

module.exports = errors;