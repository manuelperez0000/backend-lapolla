const items = 'ABCDEFGH23456789' //32

const getTemporalPass = () => {
    const max = items.length;
    const getRandonNumber = ()=>{
        return  Math.floor(Math.random() * max)
    }
    let pass = ''
    for (let index = 0; index < 6; index++) {
        pass += items[getRandonNumber()]
    }
    return pass
}

module.exports = getTemporalPass