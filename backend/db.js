const mongoose = require("mongoose");

const connectToMongo = ()=>{
    const db = mongoose.connect("mongodb://localhost:27017/authentication")
}
module.exports = connectToMongo