const express = require("express");
const router = express.Router()
const User = require("../models/user")
const fetchUser = require("../middlewares/fetchUser")

router.get('/',fetchUser, async (req, res) => {
    try { 
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router