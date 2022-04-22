const cors = require("cors")
const express = require("express");
const app = express()
const connectToMongo = require("./db")
require("dotenv").config({path:"./.env.local"})
connectToMongo()

app.use(express.json())
app.use(cors())
app.use("/api/auth",require("./routes/auth"))

app.listen(8000,()=>{console.log("the app listening on port:8000")})