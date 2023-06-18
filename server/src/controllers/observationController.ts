import { Request, Response } from "express";
import Observation from "../models/observationModel.js";
import Student from "../models/studentModel.js";
import Parent from "../models/parentModel.js";

// POST new observation
const createObservation = async (req: Request, res: Response) => {
  try {
    const { title, content, students, type, status, images } = req.body;
    const observation = await Observation.create({
      date: Date.now(),
      title,
      content,
      students: [],
      type,
      status: "saved",
      images: [],
      author: "648ed7c4fa6ad629ba8cdb65",
      likes: [],
      tags: [],
      // avatar,
    });
    await observation.save();
    return res.status(200).json(observation);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err });
  }
};

// GET all observations (girls, boys, single, group (gender or too much?), tags)
const getObservations = async (req: Request, res: Response) => {
  try {
    const gender = req.params.gender.toLowerCase();
    // const tags = req.params.tags.toLowerCase();
    console.log("Gender is", gender);
    if (gender === "girls") {
      const girls = await Observation.find()
        .populate({ path: "students", match: { gender: "female" } })
        .exec();
      console.log("Girls observation", girls);
      return res.status(200).json(girls);
    } else {
      const observations = await Observation.find({});
      console.log("No girls");
      return res.status(200).json(observations);
    }
  } catch (err) {
    console.log("Error", err);
    return res.status(500).send({ error: err });
  }
};

// GET observation by id
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

// GET observations by filters (student, gender, tags)
const getFilteredObservations = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

// PUT edit observation
const editObservation = async (req: Request, res: Response) => {
  try {
    const content = req.body.content;
    const id = req.params.id;
    const observation = await Observation.findByIdAndUpdate(id, {
      content: content,
    });
    await observation?.save();
    return res
      .status(200)
      .json({ message: "Observation updated", observation });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

// PUT change observation status
const publishObservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const observation = await Observation.findByIdAndUpdate(id, {
      status: "published",
    });
    await observation?.save();
    return res.status(200).json({ message: "Ready to publish", observation });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// PUT add students to observation
const addStudents = async (req: Request, res: Response) => {
  try {
    const studentName = req.body.studentName;
    const student = await Student.findOne({ name: studentName });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const studentId = student._id;
    const observation = await Observation.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          students: studentId,
          // students: { $each: studentId },
        },
      },
      { new: true }
    );

    if (!observation) {
      return res.status(400).json({ message: "Observation not found" });
    }

    console.log("Updated observation", observation);
    await observation.save();

    // Update the students' observations field:
    await Student.updateMany(
      { _id: { $in: studentId } },
      { $addToSet: { observations: observation._id } }
    );

    console.log("Student updated successfully");

    return res
      .status(200)
      .json({ message: "Students added to observation", observation });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
};

// PUT select type
const selectType = async (req: Request, res: Response) => {
  try {
    const type = req.body.type;
    const observation = await Observation.findByIdAndUpdate(
      req.params.id,
      { type },
      { new: true }
    );

    if (!observation) {
      return res.status(400).json({ message: "Observation not found" });
    }
    console.log("Type is:", observation.type);
    await observation.save();
    return res.status(200).json({ message: "Type added", observation });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// PUT add tags
const addTags = async (req: Request, res: Response) => {
  try {
    const tags = req.body.tags;
    const observation = await Observation.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          tags: { $each: tags },
        },
      },
      { new: true }
    );

    if (!observation) {
      return res.status(400).json({ message: "Observation not found" });
    }
    await observation.save();
    return res.status(200).send(observation);

    // Update the students' observations field:
    // await Student.updateMany(
    //   { _id: { $in: studentIds } },
    //   { $addToSet: { observations: observation._id } }
    // );

    // return res
    //   .status(200)
    //   .json({ message: "Students added to observation", observation });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// PUT add likes
const likeObservation = async (req: Request, res: Response) => {
  //   try {
  //     const observation = await Observation.findById(req.params.id);
  //     if (!observation) {
  //       return res.status(400).json({ msg: "Observation not found" });
  //     }
  //     // Compare liked user with logged in user to see if the users are the same
  //     if (
  //       observation.likes.filter((like) => like.id === req.user.id).length > 0
  //       // observation.likes.filter((like) => like.user?.toString() === req.user.id)
  //       //   .length > 0
  //     ) {
  //       return res.status(400).json({ msg: "Observation already liked" });
  //     }
  //     observation.likes.unshift({ user: req.user.id });
  //     await observation?.save();
  //     res.json(observation.likes);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send("Server error");
  //   }
};

//// DELETE likes
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

//// PUT add comments
// BOTH parents and teacher should be able to comment on posts
// const commentObservation = async (req: Request, res: Response) => {
//   try {
//     const observation = await Observation.findById(req.params.id);
//     const user = await Parent.findById(req.user.id);

//     const newComment = {
//       content: req.body.content,
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
  getObservations,
  getObservation,
  createObservation,
  editObservation,
  publishObservation,
  addStudents,
  selectType,
  addTags,
  likeObservation,
  // unlikeObservation,
  // commentObservation,
};
