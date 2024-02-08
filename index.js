require('dotenv').config({ path: '.env' })
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./router');
const dbConnect = require('./db/conection');
const cors = require('cors')

app.use(cors())
app.use(express.json())
dbConnect()

app.get('/', (req, res) => res.send("Welcome 2"))

router(app)

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))