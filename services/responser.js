const responser = (res,response)=>{
    if (response) {
        res.status(200).json({ message: "success", response })
    } else {
        res.status(400).json({ message: "Error", response })
    }
}
module.exports = responser