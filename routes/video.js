import express from 'express';
import {newVideo, deleteVideo, getVideo, updateVideo, trendingVideo, subbed, randomVideo, addView, getByTag, search } from "../controllers/video.js"
import { verifyToken } from '../verifyToken.js';

// route for users
const router = express.Router()

// create a video 
router.post("/", verifyToken, newVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trendingVideo)
router.get("/random", randomVideo)

router.get("/subscribed",verifyToken, subbed)
router.get("/tags", getByTag)
router.get("/search", search)

export default router