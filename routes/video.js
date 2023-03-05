import express from 'express';
import { pagination } from '../controllers/pagination.js';
import {newVideo, deleteVideo, getVideo, updateVideo, trendingVideo, subbed, randomVideo, addView, getByTag, search } from "../controllers/video.js"
import { verifyToken } from '../middlewares/verifyToken.js';
import Video from '../models/Video.js';
import {cloud} from "../middlewares/cloudinary.js"

import {upload} from "../middlewares/multer.js"
// const cpUpload = upload.fields([{ name: 'imgUrl', maxCount: 1 }, { name: 'videoUrl', maxCount: 1 }])
// route for users
const router = express.Router()

// create a video 
// router.post("/create", verifyToken, newVideo, upload.fields([{ name: 'imgUrl', maxCount: 1 }, { name: 'videoUrl', maxCount: 1 }]), async (req, res)=>{

//   try {
//    const result = await cloud.uploader.upload(req.file.path)
//     res.json(result)
//   } catch (err) {
//     console.log(err)
//   }
// })

router.post("/create", verifyToken, upload.single("videoUrl"), newVideo, (req,res,next)=>{
  console.log(req.file)
  next()
})
router.get("/video/:id", function (req, res) {
  
  console.log(req.headers);

 
});
router.get("/create", verifyToken,(req,res) =>{
  res.render("video-post")
})

router.put("/:id", verifyToken,  updateVideo)
router.delete("/:id", verifyToken, deleteVideo)

// router.get("/", getVideo , pagination(Video) ,(req, res, next)=>{
//     res.render("video-home")
    
// })
router.get("/", (req,res, next)=>{
    res.render("video-home")
})
router.get("/single-video", verifyToken,(req,res) =>{
  res.render("single-video")
})
router.put("/view/:id", addView)
router.get("/trend", trendingVideo)
router.get("/random", randomVideo)

router.get("/subscribed",verifyToken, subbed)
router.get("/tags", getByTag)
router.get("/search", search)

export default router