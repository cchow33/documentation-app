import express from "express";
import {
  createTeacher,
  createParent,
  verifyParent,
  verifyTeacher,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/createParent", createParent);
router.post("/createTeacher", createTeacher);
router.get("/verifyParent", verifyParent);
router.get("/verifyTeacher", verifyTeacher);

export default router;
