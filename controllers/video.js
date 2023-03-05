import { createError } from '../middlewares/error.js'
import Video from "../models/Video.js"
import User from "../models/User.js"



export const newVideo = async (req, res, next) => {
    const addVideo = new Video({ userId: req.user.id, ...req.body, videoUrl:req.videoUrl });
    try {
      const savedVideo = await addVideo.save();
      res.status(200).json(savedVideo);
    } catch (err) {
      next(err);
    }
  };
export const updateVideo  =async (req, res, next)=>{
    try {
        //  tap into the video's id 
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404," Video not found"))
        // Here we make sure the right user id is able to update the video
        if(req.user.id === video.userId){
            const updatedVideos = await Video.findByIdAndUpdate(req.params.id , {
                $set: req.body
            },
            {new:true}
            )
            res.status(200).json(updatedVideos)
        } else{
            // Error handler
         return next(createError(403," You can  update only your video"))

        }
    } catch (err) {
        next(err)
    }
}
export const deleteVideo  =async (req, res, next)=>{
    try {
            //  tap into the video's id 
            const video = await Video.findById(req.params.id)
            if(!video) return next(createError(404," Video not found"))
            // Here we make sure the right user id is able to update the video
            if(req.user.id === video.userId){
               await Video.findByIdAndDelete(req.params.id)
                res.status(200).json("The video has been deleted")
            } else{
                // Error handler
             return next(createError(403," You can delete only your video"))
    
            }
    } catch (err) {
        next(err)
    }
}
export const getVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  //   try {
  //      // Ensure there is a range given for the video
  // const range = req.headers.range;
  // if (!range) {
  //   res.status(400).send("Requires Range header");
  // }

  // // get video stats (about 11MB)
  // const videoPath = Video.findOne(req.params.videoUrl);
  // const videoSize = fs.statSync(videoPath).size;
  // console.log(videoSize)

  // // Parse Range
  // // Example: 'bytes=6750208-'
  // const CHUNK_SIZE = 5 * 10 ** 5; // ~500 KB => 500000 Bytes
  // const start = Number(range.replace(/\D/g, ""));// 'bytes=6750208-' => 6750208
  // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  // console.log(start,end);

  // // Create headers
  // const contentLength = end - start + 1;
  // const headers = {
  //   "Content-Range": `bytes ${start}-${end}/${videoSize}`,
  //   "Accept-Ranges": "bytes",
  //   "Content-Length": contentLength,
  //   "Content-Type": "video/mp4",
  // };

  // // HTTP Status 206 for Partial Content
  // res.writeHead(206, headers);

  // // create video read stream for this particular chunk
  // const videoStream = fs.createReadStream(videoPath, { start, end });

  // // Stream the video chunk to the client
  // videoStream.pipe(res);
  //   } catch (error) {
      
  //   }
  };
export const addView = async (req, res, next) => {
    try {
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      next(err);
    }
  };
export const randomVideo  =async (req, res, next)=>{
    try {
        const videos = await Video.aggregate([{
            $sample: {size: 40}
        }])
        res.status(200).json(videos)
        next(err)
    }catch(err){
        next(err)
    }
}
export const trendingVideo  =async (req, res, next)=>{
    try {
        // this is to find the most viewed video
        const videos = await Video.find().sort({videos: -1})
        res.status(200).json(videos)
        next(err)
    }catch(err){
        next(err)
    }
}
export const subbed  =async (req, res, next)=>{
    try {
        const user = await User.findById(req.user.id)
        const subbedChannels = user.subscribedVideos;

        // This is to handle all the videos 
        const list = Promise.all(
            subbedChannels.map(channelId => {
                return Video.find({ userId: channelId})
            })
        )

        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}
export const getByTag  =async (req, res, next)=>{
    try {
       

    }catch(err){
        next(err)
    }
}
export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        // using the regex funciton in mongo ot search for a video
      const videos = await Video.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };