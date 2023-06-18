import mongoose from "mongoose";
import { Schema } from "mongoose";

// Observation Schema
const observationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Teacher" },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  tags: { type: Array<String> },
  type: { type: String, enum: ["single", "group"], required: true },
  classroom: { type: String },
  status: { type: String, enum: ["new", "saved", "published"], required: true },
  images: { type: Array<String> },
  avatar: { type: String },
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "Parent" } }],
  // comments: [
  //   {
  //     author: { type: Schema.Types.ObjectId, ref: "Parent" },
  //     text: { type: String, required: true },
  //     name: { type: String },
  //     avatar: { type: String },
  //     date: { type: Date, default: Date.now },
  //   },
  // ],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  date: { type: Date, default: Date.now },
});

const Observation = mongoose.model("Observation", observationSchema);

export default Observation;
