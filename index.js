const express=require("express");
const mongoose=require("mongoose");
const app=express();
const{userRouter}=require("./routes/user.routes");
const{qRouter}=require("./routes/question.routes")
const{connect}=require("./db")
app.use(express.json());

app.use("/user",userRouter);
app.use("/post",qRouter)

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"home page"})
})


app.listen(8080,async(req,res)=>{
    try{
        await connect
        console.log("db connected to atlas")
        console.log("server running at port 8080")

    }
    catch(err){
        console.log(err)
    }
})