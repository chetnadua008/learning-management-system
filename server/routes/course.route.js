import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLectures, getCreatorCourse, getLectureById, getPublishedCourses, removeCourseAndLectures, removeLecture, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"
const CourseRouter = express.Router();

CourseRouter.route("/").post(isAuthenticated, createCourse);
CourseRouter.route("/published-courses").get(isAuthenticated, getPublishedCourses);
CourseRouter.route("/").get(isAuthenticated, getCreatorCourse);
CourseRouter.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
CourseRouter.route("/:courseId").get(isAuthenticated, getCourseById)
CourseRouter.route("/:courseId/lecture").post(isAuthenticated, createLecture)
CourseRouter.route("/:courseId/lecture").get(isAuthenticated, getCourseLectures)
CourseRouter.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
CourseRouter.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
CourseRouter.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
CourseRouter.route("/:courseId").patch(isAuthenticated, togglePublishCourse);
CourseRouter.route("/:courseId").delete(isAuthenticated, removeCourseAndLectures);
export default CourseRouter;