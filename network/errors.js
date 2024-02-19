const response = require('./response');

const errors = (err, req, res) => {
    console.log(err);
    const message = err.message || "Internal Error 2";
    response.error({ res, message })
}

module.exports = errors;