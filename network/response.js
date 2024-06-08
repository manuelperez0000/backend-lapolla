exports.success = ({ res, message = 'success', body }) => {
    res.status(200).json({
        body,
        message,
        status: 200
    })
}

exports.error = ({ res, message, body, status = 500 }) => {
    res.status(status).json({
        body,
        message,
        status
    })
}