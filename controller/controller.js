const { Dog } = require("../models/dogs")
const {validationResult} = require("express-validator")
const axios = require("axios") 

const indexController = (req, res) =>{
    res.send('Hello World!')
}

const generalView = async (req, res) =>{
    const dog = await Dog.find()
    res.status(200).json({ dog })
}

const singularView = async (req, res) =>{
    const dog = await Dog.findById(req.params.id)
    res.status(200).json({ dog })
}

const search = async (req, res) =>{
    const dog = await Dog.findOne({name: req.params.name})
    res.status(200).json({ dog })
}

const createDog = async (req, res) =>{
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            const dog = new Dog(req.body)
            await dog.save()
            res.status(201).json({ dog })
        } else {
            res.status(501).json({err})
        }
    } catch (error) {
        res.status(501).json({error})
    }
}

const editDog = async (req, res) =>{
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            await Dog.findByIdAndUpdate(req.params.id, req.body)
            res.status(201).json({msg: "Updated successfully"})
        } else {
            res.status(501).json({err})
        }
    } catch (error) {
        res.status(501).json({error})
    }
}

const deleteDog = async (req, res) =>{
    const dog = await Dog.findByIdAndDelete(req.params.id)
    res.status(200).json(dog)
}

const requestAxios = async (req, res) => {
    try {
        const answer = await axios.request("https://dog.ceo/api/breeds/image/random");
        res.status(200).json({data: answer.data, status: answer.status});
    } catch (error) {
        res.json({status: error.response.status, data: error.response.data})
    }
}

module.exports = {indexController, generalView, singularView, search, createDog, editDog, deleteDog, requestAxios}