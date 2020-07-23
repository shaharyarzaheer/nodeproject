const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const user = require("./Router/auth.router")


mongoose.connect( process.env.MONGODB_CONNECTION_STRING,{
    usernewparser: true,
    useUnifiedTopology: true,

}).then(() => console.log("DB Connected"))
.catch((error) => {
console.log("error connection",error.message )
})


const app = express(); 

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// app.get('/',(req, res) => res.json("api is perfectlly connected "));
// app.use(express.json);

app.use('/user' , user);

const PORT = process.env.PORT || 3002

app.listen(PORT , () => {
    console.log(`server start on: ${PORT}`)
})
