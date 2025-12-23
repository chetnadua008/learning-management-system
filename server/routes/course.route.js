import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCourseLectures, getCreatorCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"
const CourseRouter = express.Router();

CourseRouter.route("/").post(isAuthenticated, createCourse);
CourseRouter.route("/").get(isAuthenticated, getCreatorCourse);
CourseRouter.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
CourseRouter.route("/:courseId").get(isAuthenticated, getCourseById)
CourseRouter.route("/:courseId/lecture").post(isAuthenticated, createLecture)
CourseRouter.route("/:courseId/lecture").get(isAuthenticated, getCourseLectures)
export default CourseRouter;