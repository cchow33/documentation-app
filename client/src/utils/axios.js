import axios from "axios";
import {} from "../environment";

const api = axios.create({
  baseURL:
    // process.env.NODE_ENV === "production"
    //   ? "http://documentation-app.onrender.com/api"
    //   : "http://localhost5000/api",
    "http://localhost:5000/api",
  header: {
    "Content-Type": "application/json",
  },
});

export { api };
