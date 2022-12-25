const jwt=require("jsonwebtoken")

const verifyJwt=(req,res,next)=>{
const authHeader=req.headers.authorization||req.headers.Authorization

if(!authHeader?.startsWith("Bearer"))return res.status(400).json({statusText:"fail",message:"unAuthorized"})

const token=authHeader.split(" ")[1]
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err)return res.status(403).json({statusText:"fail",message:"forbidden"})
req.userInfo={email:decoded.userInfo.email,
firstName:decoded.userInfo.firstName,
lastName:decoded.userInfo.lastName,
id:decoded.userInfo.id}

next()
})
}

module.exports=verifyJwt