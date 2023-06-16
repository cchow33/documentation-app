import { Request, Response } from "express";
import Observation from "../models/observationModel.js";

const createObservation = async (req: Request, res: Response) => {
  try {
    const { title, text, students, type, status, images } = req.body;
    const observation = await Observation.create({
      date: Date.now(),
      title,
      text,
      students: [],
      type: "single",
      status: "saved",
      images: [],
      author: "Miss Chow",
      likes: [],
      // avatar,
    });
    await observation.save();
    return res.status(200).json(observation);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

const getAllObservations = async (req: Request, res: Response) => {
  try {
    const allObservations = await Observation.find({});
    return res.status(200).json(allObservations);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

const getObservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const observation = await Observation.findById(id);
    return res.status(200).json(observation);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

const editObservation = async (req: Request, res: Response) => {
  try {
    const text = req.body.text;
    const id = req.params.id;
    const observation = await Observation.findByIdAndUpdate(id, {
      text: text,
    });
    return res
      .status(200)
      .json({ message: "Observation updated", observation });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

const publishObservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const observation = await Observation.findByIdAndUpdate(id, {
      status: "published",
    });
    return res.status(200).json({ message: "Ready to publish", observation });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

const likeObservation = async (req: Request, res: Response) => {
  try {
    const observation = await Observation.findById(req.params.id);
    if (!observation) {
      return res.status(400).json({ msg: "Observation not found" });
    }
    // Check if the observation has already been liked by
    if (
      observation.likes.filter((like) => like.user?.toString() === req.user.id)
        .length > 0
    ) {
      return res.json(400).json({ msg: "Observation already liked" });
    }
    observation.likes.unshift({ user: req.user.id });
    await observation.save();
    res.json(observation.likes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const commentObservation = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export {
  getAllObservations,
  getObservation,
  createObservation,
  editObservation,
  publishObservation,
  likeObservation,
  commentObservation,
};
