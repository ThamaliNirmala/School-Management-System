//mongodb schema

//import mongoose package and assign it to the const variable
const mongoose = require("mongoose");
const Schema = mongoose.Schema;//access the schema

const newStudentSchema = new Schema({
    name :{
        type : String,
        required : true //backend validation
    },
    age :{
        type : Number,
        required : true //backend validation
    },
    gender :{
        type : String,
        required : true //backend validation
    }

})

const Student = mongoose.model("Student", newStudentSchema);//pass a two parameter(1.collection name, 2.schemaName)

module.exports = Student; //export module