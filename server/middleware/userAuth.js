import JWT from "jsonwebtoken";
import User from "../model/user.js";

export const isLoggedIn = async (req, res, next) => {
    try{
    const token = req.cookies?.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: user not logged in" });
    }
    
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode._id).select("_id name email role");
    console.log("logged in user", req.user);
    
    next();
}catch (error) {    
    return res.status(401).json({ message: "Unauthorized: invalid token", details: error.message });   
}}