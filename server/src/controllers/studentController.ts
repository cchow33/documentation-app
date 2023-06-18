import { Request, Response } from "express";
import Student from "../models/studentModel.js";
import Observation from "../models/observationModel.js";
import Note from "../models/noteModel.js";

// POST create new student
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

// GET all students
const getStudents = async (req: Request, res: Response) => {
  try {
    const filters = req.params.studentFilters.toLowerCase();
    console.log(filters);
    if (filters === "girls") {
      const girls = await Student.find({ gender: "female" });
      return res.status(200).json(girls);
    }
    if (filters === "boys") {
      const boys = await Student.find({ gender: "male" });
      return res.status(200).json(boys);
    }
    if (filters === "all") {
      const students = await Student.find({});
      return res.status(200).json(students);
    } else {
      const students = await Student.find({});
      return res.status(200).json(students);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

// GET student by name
const getStudent = async (req: Request, res: Response) => {
  try {
    const name = req.body.name.toLowerCase();
    const student = await Student.findOne({ name });
    return res.status(200).json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

// GET student by id
const getStudentbyId = async (req: Request, res: Response) => {
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

// DELETE student
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

export {
  getStudents,
  getStudent,
  getStudentbyId,
  createStudent,
  deleteStudent,
};
