import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import {v2 as cloudinary} from "cloudinary";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/video.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import homeRoute from "./routes/home.js"
import dashboardRoute from "./routes/dashboard.js"
const app = express()
const port = process.env.PORT ||3000



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
app.use("/api/user", userRoutes)
app.use("/api/users", userRoutes)

app.use("/videos", videoRoutes)
app.use("/videos/create", videoRoutes)
app.use("/videos/cat/single-video", videoRoutes)
    
app.use("/create-video", videoRoutes)
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
// Handling invalid requests
// app.use(function(req, res) {
//     // Invalid request
//           res.render("error-404")
//     });





 
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
app.listen(port, ()=>{
    connect()
    console.log("Connected")
})  