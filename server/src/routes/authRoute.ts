import express from "express";
import {
  createUser,
  verifyUser,
  getUserData,
} from "../controllers/authController.js";

const router = express.Router();

//localhost:5000/api/auth
router.post("/createUser", createUser);
router.post("/verifyUser", verifyUser);
router.get("/getUserData/:id", getUserData);

export default router;
