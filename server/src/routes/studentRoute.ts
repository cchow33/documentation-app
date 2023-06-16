import express from "express";
import {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

//localhost:5000/api/students
router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);

export default router;
