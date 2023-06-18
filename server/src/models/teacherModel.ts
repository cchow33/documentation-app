import mongoose from "mongoose";
import { Schema } from "mongoose";

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: "teacher" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  classroom: { type: String, required: true },
  school: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  observations: [{ type: Schema.Types.ObjectId, ref: "Observation" }],
  notes: [{ type: Schema.Types.Array, ref: "Note" }],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
