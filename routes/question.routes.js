const express=require("express");
const {qModel}=require("../model/post.model");
const{auth}=require("../middleware/auth")
const qRouter=express.Router();

qRouter.use(auth)

qRouter.post("/add",async(req,res)=>{
   // res.send(req.body)
    try{
        const post=new qModel(req.body);
        await post.save();
        res.send({"msg":"posted  successfully"});
    }
    catch(err){
        res.status(200).send({"err":err})
    }
})

qRouter.get("/",async(req,res)=>{
   // res.send(req.body)
    try{
        const questions=await qModel.find({userId:req.body.userId})
             console.log(questions)
        res.send({"msg":"succesfully fetched","questions":questions});
    }

    catch(err){
        res.status(200).send({"err":err})
    }
})
//update question 

qRouter.patch("/update/:id",async(req,res)=>{
    // res.send(req.body)
    const{id}=req.params

     try{
         let question=await qModel.findOne({_id:id})
         console.log(id,"id");
         console.log(req.body,"body");
        console.log(question,"question")
          if(req.body.userId==question.userId){
            console.log("inside ")
            // res.send("updated successfully")
            await qModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).send({"msg":`post with id ${id} is upadtes successfully`})
          }
          else{
            res.send("your not authorized to update");
          }
      
     }
 
     catch(err){
         res.status(200).send({"err":err})
     }
 })


module.exports={qRouter}