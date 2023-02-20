import express from 'express';
import {signup , signin} from "../controllers/auth.js"

// route for users
const router = express.Router()

// Create a user 
router.post("/signup", signup)

// // Sign in 
router.post("/signin", signin )

router.get("/signin", (req, res, next)=>{
    res.render("login")
})

router.get("/signup", (req, res, next)=>{
    res.render("signup")
})

// // Google Aunth
// router.post("/google", )

export default router