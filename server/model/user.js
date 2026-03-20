import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import authRole from "../utils/authRole.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Minimum password length is 6 characters"],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(authRole),
      default: "USER",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generateJWT: function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.EXPIRY },
    );
  },
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
};

export default mongoose.model("User", userSchema);