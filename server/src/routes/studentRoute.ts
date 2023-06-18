import express from "express";
import {
  getStudents,
  getStudent,
  getStudentbyId,
  createStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

//localhost:5000/api/students
router.post("/", createStudent);
router.post("/name", getStudent);
router.get("/:studentFilters", getStudents);
router.get("/:id", getStudentbyId); //testing
router.delete("/:id", deleteStudent);

export default router;
