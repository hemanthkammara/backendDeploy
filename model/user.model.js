const mongoose=require("mongoose");

const userSchma=mongoose.Schema({
    name:String,
    email:String,
    password:String
},{versionKey:false});

const userModel=mongoose.model("user",userSchma);

module.exports={userModel}