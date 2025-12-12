import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getCreatorCourse } from "../controllers/course.controller.js";

const CourseRouter = express.Router();

CourseRouter.route("/").post(isAuthenticated, createCourse);
CourseRouter.route("/").get(isAuthenticated, getCreatorCourse);

export default CourseRouter;