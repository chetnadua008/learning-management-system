import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse } from "../controllers/course.controller.js";

const CourseRouter = express.Router();

CourseRouter.route("/").post(isAuthenticated,createCourse);

export default CourseRouter;