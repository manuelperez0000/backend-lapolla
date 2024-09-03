/* eslint-disable no-undef */
require('dotenv').config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const app = express()
app.use(cors())

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

router(app)

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))