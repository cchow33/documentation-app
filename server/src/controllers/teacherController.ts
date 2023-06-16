import { Request, Response } from "express";
import Teacher from "../models/teacherModel.js";

const myProfile = async (req: Request, res: Response) => {
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

export { myProfile };
