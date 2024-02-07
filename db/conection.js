const mongoose = require('mongoose')
const connectionURI = 'mongodb+srv://manuelperez0000:U5Qd8RTZdNY6KKHQ@quinielascluster.zfud8vr.mongodb.net/'
const dbConnect = async () => {
    try {
        await mongoose.connect(connectionURI)
        console.log('DB connected')
    } catch (error) {
        console.log('DB error', error)
    }
}

module.exports = dbConnect;