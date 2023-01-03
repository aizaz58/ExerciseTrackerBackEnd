const activityModel = require("../models/activity");
const asyncHandler = require("express-async-handler");

const createActivity = asyncHandler(async (req, res) => {
  const { name, description, type, duration,date } = req.body;
  if (!(name && description && type && duration)) {
    return res
      .status(400)
      .json({ statusText: "fail", message: "please provide all fields" });
  }

  const activityObj = {
    user:req.userInfo.id,
    name,
    description,
    type,
    duration,
    date
  };
  const activity = await activityModel.create(activityObj);

  if (activity) {
    res
      .status(201)
      .json({
        statusText: "ok",
        message: `${name} has been created successfully`,
      });
  } else {
    res.status(500).json({ statusText: "fail", message: "invalid data" });
  }
});
const getAllActivities = asyncHandler(async (req, res) => {
    const userId=req.userInfo.id
console.log(userId)
    const activities=await activityModel.find({user:userId})
    if((!activities)||(activities.length==0)){
        return res.status(404).json({statusText:"fail",message:"You donot have any activities yet"})
    }

    res.status(200).json({statusText:"ok",activities})

});


const editActivity = asyncHandler(async (req, res) => {
  
   
    
    const activity=await activityModel.findByIdAndUpdate(req.body._id,req.body)
    if(!activity){
        return res.status(400).json({statusText:"fail",message:"something wrong happened."})
    }
    res.status(201).json({statusText:"ok",message:"successfully updated."})
});
const getActivity = asyncHandler(async (req, res) => {
  const activityId=req.params.id
<<<<<<< HEAD
  console.log(req.body)
  console.log(activityId)
=======
  console.log(req)
>>>>>>> 2c1619c1b0f6459515c0f6f8803f6c038a51d6b4
const activity=await activityModel.findOne({_id:activityId})
if(!activity){
  return res.status(204).json({statusText:"fail",message:"no acivity found with this id"})
}
res.status(200).json({statusText:"ok",activity})

});
const deleteActivity = asyncHandler(async (req, res) => {
  const activityId=req.params.id
  const activity=await activityModel.findByIdAndDelete(activityId)
  if(!activity){
    return res.status(400).json({statusText:"fail",message:"something bad happened."})
  }
  

  res.status(200).json({statusText:"ok",message:"deleted successfully"})
});
module.exports = {
  getAllActivities,
  createActivity,
  editActivity,
  getActivity,
  deleteActivity,
};
