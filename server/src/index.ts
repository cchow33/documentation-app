import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoute.js";
import studentRoutes from "./routes/studentRoute.js";
import observationRoutes from "./routes/observationRoute.js";
import parentRoutes from "./routes/parentRoute.js";
import authRoutes from "./routes/authRoute.js";

// Express app
dotenv.config();
const app = express();
const PORT = 5000;

// Init Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Routes localhost:5000/
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI ?? "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port', ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
