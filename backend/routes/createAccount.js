const bcrypt = require("bcryptjs");
const express = require("express");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router()
const User = require("../models/user")

router.post('/', [
    body("email","enter a valid email").isEmail(),
    body("password","make sure your password is strong enough").isStrongPassword()
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors })
    }
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({ error:"sorry! a user with this email already exists!" })
        }
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const newuser = new User({
            name:req.body.name,
            email:req.body.email,
            password:password
        })
        await newuser.save()
        const token = jwt.sign({id:newuser._id}, process.env.JWT_SECRET)
        res.json({token})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router