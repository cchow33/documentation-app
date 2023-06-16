import Teacher from "../models/teacherModel.js";
import Parent from "../models/parentModel.js";
import { Request, Response } from "express";

// CREATE new teacher - set Firebase UID as MongoDB key
export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { email, uid } = req.body;
    const name = req.body.name;

    // Create new user doc in MongoDB with firebaseUID
    const teacher = await Teacher.create({
      _id: uid,
      name,
      role: "teacher",
      // class,
      // school,
      students: [],
      observations: [],
      notes: [],
    });
    await teacher.save();
    console.log("Teacher created", teacher);
    return res.status(200).json({ msg: "Teacher created", teacher });
  } catch (error) {
    console.log("Error is", error);
    return res.status(400).send(error);
  }
};

// CREATE new parent - set Firebase UID as MongoDB key
export const createParent = async (req: Request, res: Response) => {
  try {
    const { email, uid } = req.body;
    const name = req.body.name;

    // Create new user doc in MongoDB with firebaseUID
    const parent = await Parent.create({
      _id: uid,
      name,
      email,
      students: [],
    });
    await parent.save();
    console.log("Teacher created", parent);

    return res.status(200).json({ msg: "Parent created", parent });
  } catch (error) {
    console.log("Error is", error);
    return res.status(400).send(error);
  }
};

// Verify Teacher
export const verifyTeacher = async (req: Request, res: Response) => {
  try {
    const uid = req.body.uid;
    const teacher = await Teacher.findById(uid);
    return res.status(200).json({ user: teacher });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

// Verify Parent
export const verifyParent = async (req: Request, res: Response) => {
  try {
    const uid = req.body.uid;
    const parent = await Teacher.findById(uid);
    return res.status(200).json({ user: parent });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
