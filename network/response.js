exports.success = ({res, message = 'success',body}) => {
    res.status(200).json({
        body,
        message,
        status:200
    })
}

exports.error = ({res, message,body}) => {
    res.status(500).json({
        body,
        message,
        status:500
    })
}