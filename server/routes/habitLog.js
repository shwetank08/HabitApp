import express from 'express';
import { getHabitLogsByDate, upsertHabitLog, streaksRange, getHabitLogsByHabitId } from '../controller/habitLog.js';
import { isLoggedIn } from '../middleware/userAuth.js'; 
const router = express.Router();

router.get('/logs', isLoggedIn,getHabitLogsByDate);
router.post('/logs/upsert/', isLoggedIn, upsertHabitLog);
router.get('/logs/streak/', isLoggedIn, streaksRange);
router.get('/logs/habit/:habitId', isLoggedIn, getHabitLogsByHabitId);

export default router;