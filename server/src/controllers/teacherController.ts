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

// Create new teacher
const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, avatar, email, password, school, classroom } = req.body;
    // const { email, uid } = req.body;
    // Create new user doc in MongoDB with firebaseUID
    const teacher = await Teacher.create({
      // _id: id,
      // _id: uid,
      role: "teacher",
      name,
      avatar,
      email,
      password,
      school,
      classroom,
      students: [],
      observations: [],
      notes: [],
    });
    await teacher.save();
    console.log("New user", teacher);
    return res.status(200).json(teacher);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
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

export { getProfile, createTeacher, getProfiles, verifyTeacher };
