import jwt from "jsonwebtoken";
import {createError} from "./error.js";


export const verifyToken = (req, res, next) => {
    // Getting access token
    const token  = req.cookies.access_token;
    if(!token) return next(createError(401 , "You are not authenticated"))

    // Verifying access token
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403 , "Token is not valid and you need to sign in"))

        
        // Assigning JWT object  to our user
        req.user = user
        next()
        
        
    })

}

