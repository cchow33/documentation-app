import mongoose from "mongoose";
import { Schema } from "mongoose";

// Schema
const noteSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  author: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  text: { type: String, required: true },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
