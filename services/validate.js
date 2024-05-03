class Validate {

    string(data) {
        const typeString = (str) => typeof str === 'string' ? true : false
        if (Array.isArray(data)) {
            data.forEach(element => {
                if (!typeString(element)) {
                    throw new Error("Error de validacion, no es un String, pass: " + typeof element + ' - ' + element)
                } else {
                    return true
                }
            })
        } else {
            if (!typeString(data)) {
                throw new Error("Error de validacion, no es un String, pass: " + typeof data + ' - ' + data)
            } else {
                return true
            }
        }
    }

    number(data) {
        const typeNumber = (num) => typeof num === 'number' ? true : false

        if (Array.isArray(data)) {
            data.forEach(element => {
                if (!typeNumber(element)) {
                    throw new Error("Error de validacion, no es un Number, pass: " + typeof element + ' - ' + element)
                } else {
                    return true
                }
            })
        } else {
            if (!typeNumber(data)) {
                throw new Error("Error de validacion, no es un Number, pass: " + typeof data + ' - ' + data)
            } else {
                return true
            }
        }
    }

    required(data) {
        if (Array.isArray(data)) {
            data.forEach(element => {
                if (!element && element !== 0) {
                    throw new Error("Error de validacion, dato es requerido")
                } else {
                    return true
                }
            })

        } else {
            if (!data && data !== 0) {
                throw new Error("Error de validacion, dato es requerido, pass: " + data)
            } else {
                return true
            }
        }
    }

    email(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data)) {
            throw new Error("Error de validacion, dato no es un email valido, pass: " + data)
        } else {
            return true
        }
    }
}

const validate = new Validate

module.exports = validate