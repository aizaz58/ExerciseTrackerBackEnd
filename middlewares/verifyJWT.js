const jwt=require("jsonwebtoken")

const verifyJwt=(req,res,next)=>{
const authHeader=req.headers.authorization||req.headers.authorization

if(!authHeader?.startsWith("Bearer"))return res.status(400).json({statusText:"fail",message:"unAuthorized"})

const token=authHeader.split(" ")[1]
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err)return res.status(403).json({statusText:"fail",message:"forbidden"})
req.email=decoded.userInfo.email,
req.firstName=decoded.userInfo.firstName,
req.lastName=decoded.userInfo.lastName
req.id=decoded.userInfo._id
next()
})
}

module.exports=verifyJwt