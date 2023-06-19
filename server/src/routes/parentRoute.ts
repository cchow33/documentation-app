import express from "express";
import { addChild } from "../controllers/parentController.js";

const router = express.Router();

//localhost:5000/api/parents
router.put("/:id/addChild", addChild);

export default router;
