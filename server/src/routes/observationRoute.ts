import express from "express";
import {
  getObservation,
  getAllObservations,
  createObservation,
  editObservation,
  publishObservation,
  addStudents,
  addType,
  // likeObservation,
  // unlikeObservation,
  // commentObservation,ob
} from "../controllers/observationController.js";

const router = express.Router();

//localhost:5000/api/observations
router.post("/", createObservation);
router.get("/", getAllObservations);
router.get("/:id", getObservation);
router.put("/:id", editObservation);
router.put("/:id/add-students", addStudents);
router.put("/:id/publish", publishObservation);
router.put("/:id/type", addType);

export default router;
