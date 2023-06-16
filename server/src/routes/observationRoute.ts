import express from "express";
import {
  getAllObservations,
  getObservation,
  createObservation,
  editObservation,
  publishObservation,
  likeObservation,
  commentObservation,
} from "../controllers/observationController.js";

const router = express.Router();

//localhost:5000/api/observations
router.post("/", createObservation);
router.get("/", getAllObservations);
router.get("/:id", getObservation);
router.put("/:id", editObservation);
router.put("/:id/publish", publishObservation);
router.put("/like/:id", likeObservation);
router.put("/:id/add-comment", commentObservation);

export default router;
