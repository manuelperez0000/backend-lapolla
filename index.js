require('dotenv').config({ path: '.env' })
const pollabot = require('./services/pollabot/pollabot')
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const app = express()
app.use(cors())
pollabot()

//zona horaria
process.env.TZ = "America/Caracas"
const date = new Date()
const hora = date.getHours()
const minutos = date.getMinutes()
/* console.log(`Hora del servidor: ${hora}:${minutos}`) */

const router = require('./router')
const dbConnect = require('./db/conection')
const morgan = require('morgan')

app.use(morgan('dev'))

app.use(express.json())
dbConnect()

app.get('/', (req, res) => res.send("Welcome 34"))
/* app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html'))) */

router(app)

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))