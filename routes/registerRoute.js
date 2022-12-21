const express=require("express")
const register = require("../controllers/registerController")
const user = require("../models/user")
const router=express.Router()


router.post("/",register)

module.exports=router