//declare a constant variables and assign dependencies into that variables
const express = require("express");//web framework for node
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

//assign 8070 port or available port number in to the PORT variable(define a port number)
const PORT = process.env.PORT || 8070;

//use a declared dependancies
app.use(cors());
app.use(express.json()); //To parse the incoming request with JSON payloads

//assign a MONGODB URL for constant variable
const URL = process.env.MONGODB_URL;

//define a connection
mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//open a created connection for one time
const connection = mongoose.connection; //assign db connection to the constant variable
connection.once("open", () => {
    console.log("Mongodb connection success!"); //is a connection opened successfully display a connection successfull msg
});

app.listen(PORT, () => {
    console.log("Server is up and running on port number: " + PORT)
});

const studentRouter  = require("./routes/student");//import router

app.use("/student",studentRouter);//this catch frontend url http://localhost:8070/student

