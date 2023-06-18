import express from "express";
import {
  getObservation,
  getObservations, // Filtering
  createObservation,
  editObservation,
  publishObservation,
  addStudents,
  addType,
  addTags,
  likeObservation,
  // unlike,
  // comment,
  // uncomment
} from "../controllers/observationController.js";

const router = express.Router();

//localhost:5000/api/observations
router.post("/", createObservation);
router.get("/:gender", getObservations);
router.get("/:id", getObservation);
router.put("/:id", editObservation);
router.put("/type/:id", addType);
// router.put("/:id/type", addType); //keeps spinnning
router.put("/:id/add-students", addStudents);
router.put("/:id/tags/addtags", addTags);
router.put("/:id/publish", publishObservation);
router.put("/:id/like", likeObservation);

export default router;
