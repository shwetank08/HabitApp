import User from "../model/user.js";
import cookieToken from "../utils/cookieToken.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    cookieToken(user, res);
  } catch (error) {
    res.status(500).json({ message: "signin failed", details: error.message });
  }
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {            
            return res.status(400).json({ message: "Email already in use" });
        }

        const newuser = await User.create({ name, email, password });
        cookieToken(newuser, res);
    }catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "signup failed", details: error.message });
    }
}

export const signout = async (req, res) => {
    try {
        res.status(200).cookie("token", null,{
            expiry: new Date(Date.now()),
            httpOnly: true
        }).json({ message: "Signout successful" });
    } catch (error) {
        res.status(500).json({ message: "signout failed", details: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "user does not exists", details: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(!users) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", details: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", details: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const getuser = req.user.id
        if (!getuser) {
            return res.status(404).json({ message: "User not found" });
        }
        const updateTheUser = await User.findByIdAndUpdate(getuser, req.body, { returnDocument: "after", runValidators: true });
        res.status(200).json({ message: "User updated successfully", user: updateTheUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", details: error.message });
    }
}
