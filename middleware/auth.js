const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
   /// console.log(req.headers)
   const token =req.headers.authorization.split(" ")[1];
  // console.log(token,"token")
   if(token){

       jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            console.log(req.body)
            req.body.userId=decoded.userId
            req.body.userName=decoded.userName
          console.log(decoded,"decoded")
              next()
        }else{
          res.send("token expired")
        }
       })
   }else{
    res.statis(200).send({"msg":"please login"})
   }
}


module.exports={auth}