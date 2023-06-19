import mongoose from "mongoose";
import { Schema } from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["teacher", "parent"], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
