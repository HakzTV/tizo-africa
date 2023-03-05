import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../middlewares/error.js";
import jwt from "jsonwebtoken"

// import dotenv from "dotenv"
// Signup logic 
export const signup = async (req, res, next)=>{
    
    try{
        // To hash a password
        const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.body.password, salt);
        // Spread operator to take all the information in the body 
       const newUser = new User({...req.body,password : hash} )

       await newUser.save();
       res.redirect("/api/auth/signin")
    }catch(err){
        next(err)
    }
}

// sign in logic
export const signin = async (req, res, next)=>{
    
    try{
        // Finding the user's email
        const user = await User.findOne({email: req.body.email})
        if(!user) return next(createError(404, "User not found sorry"))

        // Here we compare user password and stored password to see if its correct
      const isCorrect =  await bcrypt.compare(req.body.password, user.password)
      if(!isCorrect)return next(createError(400, "Wrong password"))
        // Creating a hash token
      const token = jwt.sign({id:user._id}, process.env.JWT,{expiresIn : '1d'})
    //   to seperate the password from the other details using the spread operator
         const {password, ...otherDetails} = user._doc
    //   Sending the token to user
     return  res.cookie("access_token", token, {
        httpOnly: true
      }).redirect("/dashboard")

    }catch(err){
        next(err)
    }
   
}