import mongoose from "mongoose";

//Schema model for Videos

const VideoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true, 
    },
    title: {
        type: String, 
    },
    description:{
        type: String, 
       
    }, 
    imgUrl:{
        type: String
    },
    videoUrl: {
        type: String, 
        required: [true, "You must upload a video"]
    }, 
    views: {
        type: Number,
        default: 0,
      },
    tags:{
        type: [String], 
        default: []
    },
    cloudinary_id: {
        type: String
      }
},({timestamps: true}))

// Exporting 
export default mongoose.model("Video", VideoSchema)