const validateToken = (req, res) => {
    const authorization = req.headers.authorization || ''
    const token = authorization.slice(7)
    try {
        jwt.verify(token, DATA_TOKEN, (err) => {
            if (err) {
                res.status(500).json({ message: 'No Aunthorization token' })
                return
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error en la autorizacion' })

    }
}
module.exports = validateToken