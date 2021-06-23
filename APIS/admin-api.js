const exp=require("express");
const expressAsyncHandler = require("express-async-handler");
const adminApi=exp.Router();
//const bcryptjs=require("bcryptjs")
const expressErrorHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")

adminApi.use(exp.json())

//user login
adminApi.post("/login",expressErrorHandler(async(req,res,next)=>{

  
    let adminCollectionObject=req.app.get("adminCollectionObject")
    
    let credentials=req.body;
    //verify username
    let user=await adminCollectionObject.findOne({username:credentials.username})
    //if user is not existed 
    if(user === null){
      res.send({message:"Invalid username"})
    }
    else{
        if(credentials.password!==user.password){
            res.send({message:"invalid password"})
        }
        else{
      //create a token and send it as res
      let token =await jwt.sign({username:credentials.username},'abcdef',{expiresIn:120})
      //remove password from user
      delete user.password;
      res.send({
               message:"login-success",
               token:token,
               username: credentials.username
              
              })
            }
  
    }
  }))
  
  
  











//export
module.exports=adminApi;