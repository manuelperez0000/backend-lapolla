const Object = (obj, interface) => {
    if ($typeof(obj) !== 'object') return error($typeof(obj), "object")
    if (interface) {
        for (const key in obj) {
            if ($typeof(obj[key]) !== interface[key]){

                return false
            }else{
                return true
            } 
        }
    }
}
module.exports = Object