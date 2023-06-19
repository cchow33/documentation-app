import { Request, Response } from "express";
import Parent from "../models/parentModel.js";
import Student from "../models/studentModel.js";

// PUT add child to parent doc
const addChild = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const child = await Student.findOne({ name: name });
    if (!child) {
      return res.status(404).json({ message: "Student not found" });
    }
    const studentId = child._id;
    console.log(child._id);
    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          child: studentId,
        },
      },
      { new: true }
    );
    console.log(parent);
    res.status(200).send(parent);
    if (!parent) {
      return res.status(400).json({ message: "No such user" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

export { addChild };
