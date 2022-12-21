const express=require("express")

const User = require("../models/user")
const router=express.Router()
const bcrypt=require("bcrypt")
const multer=require("multer")
const { avatarUpload, userPhoto } = require("../controllers/avatarController")


router.post("/",userPhoto,avatarUpload)


module.exports=router