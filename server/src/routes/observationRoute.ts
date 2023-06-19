import express from "express";
import {
  getObservation,
  getObservations, // Filtering
  createObservation,
  editObservation,
  publishObservation,
  addStudents,
  selectType,
  addTags,
  likeObservation,
  getObservationsByTags,
  // unlike,
  // comment,
  // uncomment
} from "../controllers/observationController.js";

// Sample Tags: ["language", "math", "music"]

const router = express.Router();

//localhost:5000/api/observations
router.post("/", createObservation);
router.get("/:gender/:type", getObservations);
router.get("/:type", getObservationsByTags);
router.get("/:id", getObservation);
router.put("/:id", editObservation);
router.put("/type/:id", selectType);
router.put("/:id/add-students", addStudents);
router.put("/:id/tags/addtags", addTags);
router.put("/:id/publish", publishObservation);
router.put("/:id/like", likeObservation);

export default router;
