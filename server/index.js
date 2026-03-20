import express from "express";
import connectDB from "./config/database.js";  
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.js";

dotenv.config();    

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Habbit App API");
});


// Connect to the database
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});