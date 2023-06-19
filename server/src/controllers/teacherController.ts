import { Request, Response } from "express";
import Teacher from "../models/teacherModel.js";
import Observation from "../models/observationModel.js";

// GET profile
const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await Teacher.findById(id)
      .populate("students")
      .populate("observations")
      .populate("notes");
    if (!profile) {
      return res.status(400).json({ msg: "User not found" });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
};

// GET all profiles
const getProfiles = async (req: Request, res: Response) => {
  try {
    const allTeachers = await Teacher.find({});
    return res.status(200).json(allTeachers);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

// VERIFY existing user
const verifyTeacher = async (req: Request, res: Response) => {
  try {
    const uid = req.body.uid;
    const user = await Teacher.findById(uid);
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export { getProfile, getProfiles, verifyTeacher };
