import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  editNote,
  publishNote,
  saveNote,
} from "../controllers/noteController.js";

const router = express.Router();

//localhost:5000/api/notes
router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", editNote);
router.delete("/:id", deleteNote);
router.put("/:id/save", saveNote);
router.put("/:id/publish", publishNote);

export default router;
