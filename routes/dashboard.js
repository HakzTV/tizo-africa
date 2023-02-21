import express from 'express';
import ejs from 'ejs'
// import {} from "../controllers/user.js"

// route for users
const router = express.Router()

router.get("/", (req,res, next)=>{
    res.render("dashboard", { title: "Dashboard"})
})
// Getting username
// , {name: req.user.name}
router.get("/account", (req, res, next)=>{
    res.render("account")
})

router.get("/forgot-password", (req, res, next)=>{
    res.render("forgot-pass")
})

// router.get("/login", (req, res) =>{
// res.render("login")
// })


export default router