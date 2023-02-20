import { createError } from "../error.js"
import User from "../models/User.js"

export const update = async (req, res,next)=>{
    // Comparing if the access token created (JWT) matches the one signed in to see if they can update
    if(req.params.id === req.user.id){
        try {
            // So after finding the corresponding ID we can then update what is in the body
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
            // This is to make sure that the change is saved
            {new : true}
            );
            res.status(200).json(updatedUser)
        } catch (err) {
            next(err)
        }
    }else{
        return next(createError(403, "You can only update your account"))
    }
}

export const delUser = async (req, res, next)=>{
    if(req.params.id === req.user.id){
        try {
            // After finding the right ID we can then delete the user
          await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted")
        } catch (err) {
            next(err)
        }
    }else{
        return next(createError(403, "You can only delete your account"))
    }
    
}
export const getUser = async(req, res ,next)=>{
    try {
        const user = await User.findById(req.params.id)
        
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
export const subscribe = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successfull.")
    } catch (err) {
      next(err);
    }
  };
  
  export const unsubscribe = async (req, res, next) => {
    try {
      try {
        await User.findByIdAndUpdate(req.user.id, {
          $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
          $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull.")
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  };
  