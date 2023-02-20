import mongoose from "mongoose";

//Schema model for Comments

const CommentSchema = new mongoose.Schema({
    UserId:{
        type: String,
        required: true, 
    },
    VideoId: {
        type:String, 
        required: true, 
    }, 
    description: {
        type:String, 
        required: true, 
    }, 
    
},({timestamps: true}))


// Exporting 
export default mongoose.model("Comment", CommentSchema)