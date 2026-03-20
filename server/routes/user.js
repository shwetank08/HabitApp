import express from 'express';
import {signin, signup, signout, getUserProfile, getAllUsers, deleteUser, updateUser} from "../controller/user.js"
import { isAdmin, isLoggedIn } from '../middleware/userAuth.js';

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/:id/user", isLoggedIn ,getUserProfile);
router.get("/users", isLoggedIn,isAdmin, getAllUsers);
router.delete("/:id/delete", isLoggedIn, deleteUser);
router.put("/update", isLoggedIn, updateUser);
router.get("/signout", isLoggedIn, signout);

export default router;