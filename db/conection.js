const mongoose = require('mongoose')
const DB_URI = process.env.DB_URI
const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log('DB connected')
    } catch (error) {
        console.log('DB error', error)
    }
}

module.exports = dbConnect;