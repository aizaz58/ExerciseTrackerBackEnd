const mongoose=require("mongoose")


const connectDB=async()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE_URI,{
            useNewUrlParser:true,
        useUnifiedTopology:true,
        dbName:'exerciseTrackerDB'
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB