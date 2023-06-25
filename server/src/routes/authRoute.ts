import express from "express";
import { signup, login, getUserData } from "../controllers/authController.js";

const router = express.Router();

//localhost:5000/api/auth
router.post("/signup", signup);
router.post("/login", login);
router.get("/getUserData/:id", getUserData);

export default router;
