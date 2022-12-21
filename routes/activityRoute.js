const express=require("express")
const { createActivity, getAllActivities, deleteActivity, editActivity, getActivity } = require("../controllers/activityController")
const router=express.Router()
const app=express()
const verifyJwt=require("../middlewares/verifyJWT")




router.route("/").post(createActivity).get(getAllActivities)

 router.route("/:id").delete(deleteActivity).patch(editActivity).get(getActivity)



module.exports=router