const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const express = require("express");

const userRouter = express.Router();

// testing route
userRouter.get("/", (req, res) => {
  res.send("/userRouter respond");
});

// user register route

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let userE = await userModel.findOne({ email });
  //console.log(userE);
  if (userE) {
    res.status(200).send({ msg: "email already existes" });
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      //console.log(err,hash)
      if (err) {
        res.send({ msg: err });
      } else {
        const user = new userModel({ name, email, password: hash });
        await user.save();
        res.send({ msg: "user registed successfully" });
      }
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//user login
userRouter.post("/login",async(req,res)=>{
    const { name, email, password } = req.body;
    try{
        let user= await userModel.findOne({ email });
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userName:user.name,userId:user._id},"masai",{expiresIn: "7h" });
                res.status(200).send({"msg":"login successful","token":token});
            }else{
                res.status(200).send({"msg":"wrong credentials"})
            }

        })

    }
    catch(err){
        res.status(400).send({"error":err})
    }
})



module.exports = { userRouter };
