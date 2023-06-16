import express from "express";
import { myProfile } from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", myProfile);

export default router;
