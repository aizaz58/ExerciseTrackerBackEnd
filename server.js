require("dotenv").config()
const express=require("express")
const app=express()
const path=require("path")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const corsOption=require("./config/corsOption")
const errorHandler = require("./middlewares/errorHandler")
const connectDB = require("./config/dbConn")
const  mongoose  = require("mongoose")
const avatarUpload = require("./controllers/avatarController")
const verifyJwt = require("./middlewares/verifyJWT")

const port=process.env.PORT||3500
const api=process.env.API
const router=express.Router()
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
connectDB()
//cross origin resource sharing
app.use(cors(corsOption))
// built-in middlewares for handling json and urlencoded  data in post and put requests from req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// third-party middleware for cookies
app.use(cookieParser())


app.use("/",express.static(path.join(__dirname,"public")))
app.use("/",require("./routes/root"))
app.use("/register",require("./routes/registerRoute"))
app.use("/auth",require("./routes/loginRoute"))
app.use(verifyJwt)
app.use("/activity",require("./routes/activityRoute"))
app.use("/upload",require("./routes/uploadRoute"))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: `${req.originalUrl} Not Found` })
    } else {
        res.type('txt').send(`${req.originalUrl} Not Found`)
    }
})
//custom middleware for error handling
app.use(errorHandler)

let server
 mongoose.connection.once("open",()=>{
    console.log("datbaseConnected")
   server= app.listen(port,()=>{
        console.log(`app is running on port ${port}`)
    })

})

mongoose.connection.on("error",(err)=>{
console.log(err)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);//0 for success 1 for uncaugth exception
    });
  });