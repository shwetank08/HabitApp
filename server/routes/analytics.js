import express from "express";
import { getAnalytics } from "../controller/analytics.js";
import { isLoggedIn } from "../middleware/userAuth.js";

const router = express.Router();

router.get("/analytics", isLoggedIn, getAnalytics);

export default router;