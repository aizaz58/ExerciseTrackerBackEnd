const bcrypt=require("bcrypt")
const asyncHandler=require("express-async-handler")
const User = require("../models/user")



const register=asyncHandler(async(req,res)=>{
    const {email,firstName,lastName,password}=req.body

    if(!(email&&firstName&&lastName&&password)){
return res.status(400).json({statusText:"fail",message:"please provide all fields"})
    }
    const duplicate=await User.findOne({email:email}).lean().exec()
    if(duplicate){
       return res.status(409).json({statusText:"fail",message:"user already exists"}) //conflict
    }
const hashPwd=await bcrypt.hash(password,10)
const userObj={email,"password":hashPwd,firstName,lastName}
const user=await User.create(userObj)
    if(user){
        res.status(201).json({statusText:"ok",message:`${firstName} has been registered successfully`})
    }else{
        res.status(500).json({statusText:"fail",message:"invalid data"})
    }
})

module.exports=register

