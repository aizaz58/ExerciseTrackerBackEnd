

const errorHandler=(err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500 // server error 

    const status=err.status||"error"

   res.status(statusCode).json({ message: err.message,status:status })
}

module.exports=errorHandler