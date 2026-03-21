import express from 'express';
import { createHabit, deleteHabits, getHabitById, updateHabits } from '../controller/habit.js';
import { isLoggedIn } from '../middleware/userAuth.js';


const router = express.Router();

router.post("/create", isLoggedIn,createHabit);
router.get("/gethabit/:id", isLoggedIn, getHabitById);
router.put("/updatehabit/:id", isLoggedIn, updateHabits);
router.delete("/deletehabit/:id", isLoggedIn, deleteHabits);

export default router;