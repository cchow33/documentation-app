import mongoose from "mongoose";
import { Schema } from "mongoose";

// Create Comment Schema
const commentSchema = new mongoose.Schema({
  author: [{ type: Schema.Types.ObjectId, enum: ["teacher", "parent"] }],
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
