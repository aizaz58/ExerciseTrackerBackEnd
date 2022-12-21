const mongoose=require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);
const activitySchema=new mongoose.Schema({
    
    user:{
        type:Number,
        required:true,
        
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["run","bicycle ride","swim","walk","hike"]
    },
    duration:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
       
    },
})
// activitySchema.plugin(AutoIncrement,{start_seq:5000,collection_name:"activity-counter"});
module.exports=mongoose.model("Activity",activitySchema)