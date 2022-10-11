const express = require("express")
const router = express.Router()
const { indexController, generalView, singularView, search, createDog, editDog, deleteDog, requestAxios } = require("../controller/controller")
const {validateId} = require("../middleware/validateId")
const {validateName} = require("../middleware/validateName")
const {check} = require("express-validator")

//get
router.get('/', indexController)
router.get('/view', generalView)
router.get('/view/:id', validateId, singularView)
router.get('/search/:name', validateName, search)
router.get('/axios', requestAxios);

//post
router.post('/create', [
    check("name").not().isEmpty().withMessage("You have to submit a name"),
    check("age").not().isEmpty().withMessage("You have to submit an age"),
    check("gender").not().isEmpty().withMessage("You have to submit a gender"),
    check("vaccinated").not().isEmpty().withMessage("You have to submit if the dog is vaccinated")
], createDog)

//put
router.put('/edit/:id', validateId, [
    check("name").not().isEmpty().withMessage("You have to submit a name"),
    check("age").not().isEmpty().withMessage("You have to submit an age"),
    check("gender").not().isEmpty().withMessage("You have to submit a gender"),
    check("vaccinated").not().isEmpty().withMessage("You have to submit if the dog is vaccinated")
], editDog)

//delete
router.delete('/delete/:id', validateId, deleteDog)


module.exports = router