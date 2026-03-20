import express from 'express';
// import {signin, signup, signout, getUserProfile, getAllUsers, deleteUser, updateUser} from "../controller/user.js"
import { signup } from '../controller/user.js';
import { isLoggedIn } from '../middleware/userAuth.js';

const router = express.Router();
router.post("/signup", signup);
// router.post("/signin", signin);
// router.get("/:id/user", isLoggedIn ,getUserProfile);
// router.get("/users", isLoggedIn, getAllUsers);
// router.delete("/delete", isLoggedIn, deleteUser);
// router.put("/update", isLoggedIn, updateUser);
// router.get("/signout", isLoggedIn, signout);

export default router;