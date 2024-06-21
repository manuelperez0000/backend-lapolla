const { getAyerGranQuiniela, finalizarQuiniela } = require('../../db/controllers/quinielaController')
const apagarMiniQuinielaAnterior = async () => {

    //obtener la granquiniela de ayer
    const ayerQuiniela = await getAyerGranQuiniela(2)
    const miniQuinielaAyer = ayerQuiniela[0]

    //revisar si esta apagada
    const activada = miniQuinielaAyer?.status

    

 } //si esta apagada no hacer nada

const iniciarMiniQuiniela = () => { }
const repartirPremiosMiniQuiniela = () => { } //acunular saldo si no hay ganador

module.exports = {
    apagarMiniQuinielaAnterior,
    iniciarMiniQuiniela,
    repartirPremiosMiniQuiniela
}