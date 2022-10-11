const {Dog} = require("../models/dogs")

const validateName = async (req, res, next) => {
    const dog = await Dog.findOne(req.params);
    if (dog !== null) {
        next()
    } else {
        res.status(500).json({msg: "Couldn't find a dog with that name"});
    }
}

module.exports = { validateName }