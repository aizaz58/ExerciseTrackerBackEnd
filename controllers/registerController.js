const bcrypt=require("bcrypt")
const asyncHandler=require("express-async-handler")
const User = require("../models/user")
const jwt = require("jsonwebtoken");


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
        const accessToken = jwt.sign(
            {
              userInfo: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15min" }
          );
          const refreshToken = jwt.sign(
            {
              userInfo: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id,
              },
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
          );
      
          //cookie with refreshtoken
          res.cookie("jwt", refreshToken, {
            httpOnly: true,//only accessible by web server
            secure: true, //https
            sameSite: "None", //cross-site cookie
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });


        res.status(201).json({statusText:"ok",message:`${firstName} has been registered successfully`,accessToken,foundUser:{email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,}})
    }else{
        res.status(500).json({statusText:"fail",message:"invalid data"})
    }
})

module.exports=register

