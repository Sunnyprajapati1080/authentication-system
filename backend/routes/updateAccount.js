const bcrypt = require("bcryptjs");
const express = require("express");
const { validationResult, body } = require("express-validator");
const router = express.Router()
const User = require("../models/user")
const fetchUser = require("../middlewares/fetchUser")

router.patch('/',[fetchUser,body("password").isStrongPassword()],async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({errors})
    }
    try {
        const user = await User.findById(req.user.id)
        if(req.body.email!==user.email){
            res.json({error:"not allowed"})
        }
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const updated = await User.findByIdAndUpdate(req.user.id, {$set:{
            name:req.body.name,
            password:password
        }},{new:true})
        res.json(updated)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router