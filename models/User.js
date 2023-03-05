import mongoose from "mongoose";
// import {creAt, upAt} from "../controllers/timestamps.js"
//Schema model for Users 

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    }, 
    lastName:{
        type: String,
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password:{
        type: String, 
        required: true
    },
    level: {
        type: String, 
        required: true
    },
    img:{
       type: String
    }, 
    subscribers: {
        type: Number , 
        default: 0
    },
    subscribedUsers: {
        type: [String],
        unique: true

    }
},({timestamps: true}))

 
// Exporting 
export default mongoose.model("User", UserSchema)