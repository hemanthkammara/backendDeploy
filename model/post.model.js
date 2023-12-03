const mongoose=require("mongoose");

const qSchma=mongoose.Schema({
   question:String,
   topic:String,
   likes:Number,
   answers:Array,
   userName:String,
   userId:String
},{versionKey:false});

const qModel=mongoose.model("question",qSchma);

module.exports={qModel}