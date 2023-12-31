import Teacher from "../models/teacherModel.js";
import Parent from "../models/parentModel.js";
import Student from "../models/studentModel.js";
import User from "../models/userModel.js";
import { Request, Response } from "express";

// SIGNUP
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (role === "teacher") {
      const teacher = await Teacher.create({
        name,
        password,
        email,
        avatar: "",
        role: "teacher",
        class: "",
        school: "",
        students: [],
        observations: [],
        notes: [],
      });
      await teacher.save();
      console.log("New teacher created", teacher);
      return res.status(200).json({ msg: "Teacher created", teacher });
    }
    if (role === "parent") {
      // else {
      const parent = await Parent.create({
        name,
        password,
        role: "parent",
        email,
        avatar: "",
        // child: {},
        comments: [],
        likes: [],
        childsObservations: [],
      });
      await parent.save();
      console.log("New parent created", parent);
      return res.status(200).json({ msg: "Parent created", parent });
    }
  } catch (error) {
    console.log("Error is", error);
    return res.status(400).send(error);
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const teacher = await Teacher.findOne({ email });
    const parent = await Parent.findOne({ email });
    if (teacher) {
      console.log("User verified");
      return res.status(200).json(teacher);
    }
    if (parent) {
      console.log("User verified");
      return res.status(200).json(parent);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET User Data
export const getUserData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    const parent = await Parent.findById(id);
    const student = await Student.findOne({ id: id });
    if (teacher) {
      await Teacher.findById(id).populate("observations").populate("students");
      return res.status(200).json(teacher);
    }
    if (student) {
      await Student.findById(id).populate("observations");
      return res.status(200).json(student);
    } else if (parent) {
      // Find parent's child:
      const child = await Student.findOne({ parent: parent._id });
      if (child) {
        await parent.populate({
          path: "childsObservations",
          populate: {
            path: "observations",
            match: { child: child._id },
          },
        });
      }
      return res.status(200).json(parent);
    } else {
      console.log("User not found");
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};
