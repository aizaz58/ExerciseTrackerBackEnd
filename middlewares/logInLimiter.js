const rateLimit=require("express-rate-limit")



const logInLimiter=rateLimit({
    windowMs:60*1000*2,
    max:5,
    message:{
        message:"too many login attempts from this ip please try again after 2 minutes"
    },
    handler:(req,res,next,options)=>{
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders:true,//return ratelimit info into RateLimit-* headers
    legacyHeaders:false //disable X-RateLimit-* headers
})

module.exports=logInLimiter