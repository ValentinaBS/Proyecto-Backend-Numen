const mongoose = require("mongoose")

const Schema = mongoose.Schema
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    vaccinated: {
        type: Boolean,
        required: true
    }
});

const Dog = mongoose.model("Dog", schema);
module.exports = { Dog }