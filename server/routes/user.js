import express from 'express';
import {signin, signup, signout, getUserProfile, getAllUsers, deleteUser, updateUser} from "../controller/user.js"
import { isAdmin, isLoggedIn } from '../middleware/userAuth.js';

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user/:id", isLoggedIn ,getUserProfile);
router.get("/users", isLoggedIn,isAdmin, getAllUsers);
router.delete("/delete/:id", isLoggedIn, deleteUser);
router.put("/update", isLoggedIn, updateUser);
router.get("/signout", isLoggedIn, signout);

export default router;