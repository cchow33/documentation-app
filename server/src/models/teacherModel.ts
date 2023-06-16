import mongoose from "mongoose";
import { Schema } from "mongoose";

// Schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: "teacher" },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // class: { type: String, required: true },
  // school: { type: String, required: true },
  students: [{ type: Schema.Types.Array, ref: "Student" }],
  observations: [{ type: Schema.Types.Array, ref: "Observation" }],
  notes: [{ type: Schema.Types.Array, ref: "Notes" }],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
