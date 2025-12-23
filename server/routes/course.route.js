import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, editCourse, getCourseById, getCreatorCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"
const CourseRouter = express.Router();

CourseRouter.route("/").post(isAuthenticated, createCourse);
CourseRouter.route("/").get(isAuthenticated, getCreatorCourse);
CourseRouter.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
CourseRouter.route("/:courseId").get(isAuthenticated, getCourseById)

export default CourseRouter;