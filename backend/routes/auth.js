const express = require('express')
const router = express.Router()

router.use("/createAccount",require("./createAccount"))
router.use("/getAccount",require("./getAccount"))
router.use("/updateAccount",require("./updateAccount"))

module.exports = router
