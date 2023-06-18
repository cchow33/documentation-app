import { Request, Response } from "express";
import Parent from "../models/parentModel.js";
import Observation from "../models/observationModel.js";

// Do we need this?? Or just automatically create parent once child is created

const createParent = async (req: Request, res: Response) => {
  try {
    const { name, email, child, avatar } = req.body;

    const parent = await Parent.create({
      name,
      email,
      child,
      avatar,
    });
    await parent.save();
    return res.status(200).json(parent);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

const getParent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parent = await Parent.findById(id)
      .populate("student_info")
      .populate("observations")
      .populate("notes");
    return res.status(200).json(parent);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

export { createParent, getParent };
