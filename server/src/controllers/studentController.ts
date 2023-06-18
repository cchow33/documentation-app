import { Request, Response } from "express";
import Student from "../models/studentModel.js";
import Observation from "../models/observationModel.js";
import Note from "../models/noteModel.js";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, avatar, teacher, gender, dob, classroom, parent } = req.body;

    const student = await Student.create({
      name,
      avatar,
      gender,
      dob,
      classroom,
      parent,
      teacher,
      notes: [],
      observations: [],
    });
    await student.save();
    return res.status(200).json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find({});
    return res.status(200).json(students);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("observations");
    // .populate("notes");
    return res.status(200).json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    return res.status(200).json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

export { getStudents, getStudent, createStudent, deleteStudent };
