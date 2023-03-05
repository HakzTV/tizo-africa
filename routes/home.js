import express from 'express';
import ejs from 'ejs'
import { verifyToken } from '../middlewares/verifyToken.js';
import { dynamicTitle } from '../title.js';
// import {} from "../controllers/user.js"
import User from '../models/User.js';
// route for users
const router = express.Router()

router.get("/", (req,res, next)=>{
    res.render("index")
})

router.get("/about", (req, res, next)=>{
    res.render("about")
})
router.get("/contact", (req, res, next)=>{
    res.render("contact")
})

router.get("/blog", verifyToken,(req, res, next)=>{
    res.render("blog")
})

router.get("/blog-post", (req, res, next)=>{
    res.render("blog-post")
})

router.get("/blog-post2", (req, res, next)=>{
    res.render("blog-post")
})


// router.get("/login", (req, res) =>{
// res.render("login")
// })


export default router