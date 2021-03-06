const express = require ('express')
const mongoose = require("mongoose")
const { use } = require('./route.js')
const Router = require("./route.js")
require ('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000


mongoose.connect(`${process.env.MONGOOSE}`)


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.use(Router);
app.listen(PORT) 