const mongoose = require('mongoose')
const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://manuel:BNWJ4EqX7glnl1cq@cluster0.8qhzw.mongodb.net/caamano');
        console.log('DB connected');
    } catch (error) {
        console.log('DB error', error);
    }
}

module.exports = dbConnect;