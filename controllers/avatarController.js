const multer=require("multer")
const asyncHAndler=require("express-async-handler")







const multerStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/img/users")
    },
    filename:(req,file,cb)=>{
        const ext=file.mimetype.split("/")[1]
        cb(null,`user-${req.userInfo.id}-${Date.now()}.${ext}`)
    }
})

const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image")||file.mimetype.startsWith("image/png")){
        cb(null,true)
    }else
    cb( new Error("only images are allowed"),false)
}

const upload=multer({storage:multerStorage,
fileFilter:multerFilter})

exports.avatarUpload=asyncHAndler(async(req,res)=>{
    console.log(req.file)
    console.log(req.userInfo)
    res.status(200).json({status:"ok"})
})

exports.userPhoto=upload.single("photo")


     
