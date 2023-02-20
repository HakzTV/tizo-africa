import express from 'express';
import { delUser, getUser, subscribe, unsubscribe, update } from "../controllers/user.js"
import { verifyToken } from '../verifyToken.js';

// route for users
const router = express.Router()

// Update user
router.put("/:id", verifyToken, update)
// Delete a user 
router.delete("/:id", verifyToken, delUser)

// get a user 
router.get("/:id", getUser)

// subscribe a user 
router.put("/sub/:id", verifyToken, subscribe)

// unsubsribe user 
router.put("/unsub/:id", verifyToken, unsubscribe)

export default router