import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLectures, getCreatorCourse, getLectureById, getPublishedCourses, removeCourseAndLectures, removeLecture, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"
import { isInstructor } from "../middlewares/isInstructor.js";
const CourseRouter = express.Router();

CourseRouter.route("/").post(isAuthenticated, isInstructor, createCourse);
CourseRouter.route("/published-courses").get(getPublishedCourses);
CourseRouter.route("/").get(isAuthenticated, isInstructor, getCreatorCourse);
CourseRouter.route("/:courseId").put(isAuthenticated, isInstructor, upload.single("courseThumbnail"), editCourse);
CourseRouter.route("/:courseId").get(isAuthenticated, getCourseById)
CourseRouter.route("/:courseId/lecture").post(isAuthenticated, isInstructor, createLecture)
CourseRouter.route("/:courseId/lecture").get(isAuthenticated, getCourseLectures)
CourseRouter.route("/:courseId/lecture/:lectureId").post(isAuthenticated, isInstructor, editLecture);
CourseRouter.route("/lecture/:lectureId").delete(isAuthenticated, isInstructor, removeLecture);
CourseRouter.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
CourseRouter.route("/:courseId").patch(isAuthenticated, isInstructor, togglePublishCourse);
CourseRouter.route("/:courseId").delete(isAuthenticated, isInstructor, removeCourseAndLectures);
export default CourseRouter;