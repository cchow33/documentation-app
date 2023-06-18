// Mongoose can also automatically infer the document type from your schema definition as follows.

import mongoose from "mongoose";
import { Schema } from "mongoose";

// Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  gender: { type: String, enum: ["male", "female"], required: true },
  dob: { type: Date, required: true },
  parent: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
  classroom: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  observations: [{ type: Schema.Types.ObjectId, ref: "Observation" }],
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
