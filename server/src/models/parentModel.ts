import mongoose from "mongoose";
import { Schema } from "mongoose";

// Schema
const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: "parent" },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  child: { type: String, required: true },
  avatar: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "Observation" }],
  student_info: [{ type: Schema.Types.ObjectId, ref: "Student" }], // should be a string right??
});

const Parent = mongoose.model("Parent", parentSchema);

export default Parent;
