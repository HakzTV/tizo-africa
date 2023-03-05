import express from 'express';
import { delUser, getUser, subscribe, unsubscribe, update } from "../controllers/user.js"
import { pagination } from '../controllers/pagination.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import User from '../models/User.js';

// route for users
const router = express.Router()

// Update user
router.put("/:id", verifyToken, update)
// Delete a user 
router.delete("/:id", verifyToken, delUser)

// get all users 
router.get("/", verifyToken, pagination(User))

router.get("/:id", verifyToken, getUser)

// subscribe a user 
router.put("/sub/:id", verifyToken, subscribe)

// unsubsribe user 
router.put("/unsub/:id", verifyToken, unsubscribe)

export default router