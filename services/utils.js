function getHoyCompletedString() {
    const date = new Date()
    const anio = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${anio}-${month}-${day}T00:00:00.000+00:00`
}

function getHour() {
    const date = new Date()
    return Number(String(date.getHours()).padStart(2, "0"))
}

module.exports = { getHoyCompletedString, getHour }

