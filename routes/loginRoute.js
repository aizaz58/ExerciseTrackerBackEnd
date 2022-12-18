const express=require("express")

const User = require("../models/user")
const router=express.Router()
const bcrypt=require("bcrypt")
const logInController = require("../controllers/loginController")
const logInLimiter = require("../middlewares/logInLimiter")

router.route("/logIn")
.post(logInLimiter,logInController.logInController)

router.route("/refresh").get(logInController.refresh)

router.route("/logout").post(logInController.logOut)



module.exports=router