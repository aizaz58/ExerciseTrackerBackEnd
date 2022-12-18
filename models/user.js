const mongoose=require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema=new mongoose.Schema({
    _id: Number,
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
                return /^\w+@\w{3,}.\w{2,}$/.test(v)
            },
            message:props=>`${props.value} is not a valid email.`
        }
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, { _id: false })
userSchema.plugin(AutoIncrement);
module.exports=mongoose.model("User",userSchema)