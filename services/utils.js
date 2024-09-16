function getHoyCompletedString() {
    const date = new Date()
    const anio = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${anio}-${month}-${day}T00:00:00.000+00:00`
}

function getAyerCompletedString() {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    date.setHours(date.getHours() - 4)
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + "T00:00:00.000+00:00"
}

function getHour() {
    const date = new Date()
    return Number(String(date.getHours()).padStart(2, "0"))
}

function getFromTo() {
    const date = new Date()
    const newFrom = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const newTo = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const from = newFrom + "T00:00:00.000+00:00";
    const to = newTo + "T23:59:59.000+00:00";
    const fromMini = newFrom + "T15:00:00.000+00:00";
    const toMini = newFrom + "T19:00:00.000+00:00";

    return { from, to, fromMini, toMini }
}

function getFromToAyerYHoy() {
    const ayer = new Date()
    const hoy = new Date()
    ayer.setDate(ayer.getDate() - 1)
    const ayer00 = `${ayer.getFullYear()}-${String(ayer.getMonth() + 1).padStart(2, '0')}-${String(ayer.getDate()).padStart(2, '0')}T00:00:00.000+00:00`
    return { from:ayer00, to:hoy }
}

function getFechasHoyMini(){
    const date = new Date()
    const newFrom = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const newTo = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const from = newFrom + "T00:00:00.000+00:00";
    const to = newTo + "T23:59:59.000+00:00";
    return { from, to }
}

const validateTokenParams = (token, params) => token === params.MQ_CLOSE || token === params.GQ_INIT || token === params.MIQ_END || token === params.MQ_INIT  

module.exports = { getHoyCompletedString, getHour, getFromTo, getAyerCompletedString, validateTokenParams,getFromToAyerYHoy,getFechasHoyMini }

