import mongoose from "mongoose";
import { Schema } from "mongoose";

// Parent Schema
const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  child: { type: Schema.Types.ObjectId, ref: "Student" },
  avatar: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "Observation" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Observation" }],
  childsObservations: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

const Parent = mongoose.model("Parent", parentSchema);

export default Parent;
