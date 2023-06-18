import express from "express";
import {
  getProfile,
  getProfiles,
  createTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

//localhost:5000/api/teachers
router.post("/", createTeacher);
router.get("/", getProfiles);
router.get("/:id", getProfile);

export default router;
