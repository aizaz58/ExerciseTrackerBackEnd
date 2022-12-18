const activityModel = require("../models/activity")
const asyncHandler=require('express-async-handler')


const createActivity=asyncHandler(async(req,res)=>{
    const {user,name,description,type,duration}=req.body
    if(!(user&& name&& description && type && duration)){
        return res.status(400).json({statusText:"fail",message:"please provide all fields"})
    }
    
const activityObj={
    user,name,description,type,duration
}
    const activity= await activityModel.create(activityObj)

    if(activity){
        res.status(201).json({statusText:"ok",message:`${name} has been created successfully`})
    }else{
        res.status(500).json({statusText:"fail",message:"invalid data"})
    }

})
const getAllActivities=asyncHandler(async(req,res)=>{


})

const editActivity=asyncHandler(async(req,res)=>{

})
const getActivity=asyncHandler(async(req,res)=>{

})
const deleteActivity=asyncHandler(async(req,res)=>{

})
module.exports={getAllActivities,createActivity,editActivity,getActivity,deleteActivity}