/* eslint-disable no-undef */
const DB_URI = process.env.DB_URI
const ADMINID = process.env.ADMINID

/* const DB_URI = "mongodb+srv://manuelperez0000:JTuFYfHXGqagR9S4@apuestas.l59hzlm.mongodb.net/?retryWrites=true&w=majority&appName=Apuestas"
const ADMINID = "66ad520f107aeb1ce3ec2b53" */

const DATA_TOKEN = process.env.DATA_TOKEN
const GMAILPASS = process.env.GMAILPASS
const environment = { DB_URI, DATA_TOKEN, GMAILPASS,ADMINID }

module.exports = environment


