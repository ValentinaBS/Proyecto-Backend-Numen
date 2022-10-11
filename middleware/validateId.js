const {Dog} = require("../models/dogs")

const validateId = async (req, res, next) =>{
    const dog = await Dog.findById(req.params.id)
    if (dog !== null) {
        next()
    } else {
        res.status(500).json({msg: "Id not found or invalid"})
    }
}

module.exports = { validateId }