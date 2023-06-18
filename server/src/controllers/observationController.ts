import { Request, Response } from "express";
import Observation from "../models/observationModel.js";
import Student from "../models/studentModel.js";

const createObservation = async (req: Request, res: Response) => {
  try {
    const { title, content, students, type, status, images } = req.body;
    const observation = await Observation.create({
      date: Date.now(),
      title,
      content,
      students: [],
      type: "single",
      status: "saved",
      images: [],
      author: "648ed7c4fa6ad629ba8cdb65",
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

const addStudents = async (req: Request, res: Response) => {
  try {
    const studentIds = req.body.studentIds;
    const observation = await Observation.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          students: { $each: studentIds },
        },
      },
      { new: true }
    );

    if (!observation) {
      return res.status(400).json({ message: "Observation not found" });
    }
    await observation.save();

    // Update the students' observations field:
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { $addToSet: { observations: observation._id } }
    );

    return res
      .status(200)
      .json({ message: "Students added to observation", observation });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Choose a student" });
  }
};

const addType = async (req: Request, res: Response) => {
  try {
    // Select type and add to observation
  } catch (error) {}
};

// const likeObservation = async (req: Request, res: Response) => {
//   try {
//     const observation = await Observation.findById(req.params.id);
//     if (!observation) {
//       return res.status(400).json({ msg: "Observation not found" });
//     }
//     // Compare liked user with logged in user to see if the users are the same
//     if (
//       observation.likes.filter((like) => like.user?.toString() === req.user.id)
//         .length > 0
//     ) {
//       return res.status(400).json({ msg: "Observation already liked" });
//     }
//     observation.likes.unshift({ user: req.user.id });
//     await observation.save();
//     res.json(observation.likes);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// };

// const unlikeObservation = async (req: Request, res: Response) => {
//   try {
//     const observation = await Observation.findById(req.params.id);
//     if (!observation) {
//       return res.status(400).json({ msg: "Observation not found" });
//     }
//     // Compare liked user with logged in user to see if the users are the same
//     if (
//       observation.likes.filter((like) => like.user?.toString() === req.user.id)
//         .length === 0
//     ) {
//       return res.status(400).json({ msg: "Observation hasn't been liked yet" });
//     }
//     // Remove like
//     const removeIndex = observation.likes
//       .map((like) => like.user?.toString())
//       .indexOf(req.user.id);
//     observation.likes.splice(removeIndex, 1);

//     await observation.save();
//     res.json(observation.likes);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// };

// BOTH parents and teacher should be able to comment on posts
// const commentObservation = async (req: Request, res: Response) => {
//   try {
//     const observation = await Observation.findById(req.params.id);
//     const user = await Parent.findById(req.user.id);

//     const newComment = {
//       text: req.body.text,
//       name: user.name,
//       avatar: user.avatar,
//       user: req.user.id,
//     };

//     if (!observation) {
//       return res.status(400).json({ msg: "Observation not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// };

export {
  getAllObservations,
  getObservation,
  createObservation,
  editObservation,
  publishObservation,
  addStudents,
  addType,
  // likeObservation,
  // unlikeObservation,
  // commentObservation,
};
