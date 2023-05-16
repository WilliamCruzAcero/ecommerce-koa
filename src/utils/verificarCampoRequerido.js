const { StatusCodes } = require('http-status-codes')
const WebError = require('./web.error')

function verificarCampoRequerido(valor, mensaje) {
    if (!valor) {
        throw new WebError(mensaje, StatusCodes.BAD_REQUEST)
    }
}

module.exports = {
    verificarCampoRequerido
}