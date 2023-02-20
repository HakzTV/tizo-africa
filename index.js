import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/video.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import homeRoute from "./routes/home.js"
import dashboardRoute from "./routes/dashboard.js"
const app = express()



// Middleware 
dotenv.config()
mongoose.set('strictQuery', true);  
// To allow json to be parsed
app.use(express.json())
// Setting ejs to check in the views section
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser()) 

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)
app.use("/", homeRoute)
app.use("/about", homeRoute)
app.use("/contact", homeRoute)
app.use("/blog", homeRoute)
app.use("/blog-post", homeRoute)
app.use("/blog-post2", homeRoute)


app.use("/dashboard", dashboardRoute)
app.use("/dashboard/account", dashboardRoute)
app.use("/dashboard/account/forgot-password", dashboardRoute)




 
// // This is to handle messages to the user

// Configurations
const url = process.env.MONGO_URI
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }


//   DB connection
const connect = ()=>{
    mongoose.connect(url, options).then(()=>{
        console.log("Connected to the DB")
    })
    .catch(err=>{
        throw err
    })
}



// Server opened
const port = 3000
app.listen(port, ()=>{
    connect()
    console.log("Connected")
})  