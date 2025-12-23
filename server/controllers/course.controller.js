import { Course } from "../models/course.model.js"
import { deleteMedia, uploadMedia } from '../utils/cloudinary.js'
export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "course title and category is required",
                success: false,
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id, //user id
        });
        return res.status(201).json({
            course,
            message: "Course created successfully",
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create a new course",
            success: false,
        })
    }
}

export const getCreatorCourse = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId });
        if (!courses) {
            return res.status(404).json({
                message: "Courses not found!",
                courses: [],
            })
        }
        return res.status(200).json({
            message: "Courses Found",
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch courses",
            success: false,
        })
    }

}
export const editCourse = async (req, res) => {
    try {
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const newThumbnail = req.file;      //seperate by Multer
        const courseId = req.params.courseId;
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }
        let newThumnailUpload;
        if (newThumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split('/').pop().split(".")[0];
                await deleteMedia(publicId)     //delete old image
            }
            //upload new thumbnail on cloudinary
            newThumnailUpload = await uploadMedia(newThumbnail.path)
        }

        const updatedData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: newThumnailUpload.secure_url }
        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });        //new:true course= returns updated course (elese old course)
        return res.status(200).json({
            course,
            message: "Course updated success"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to edit courses",
            success: false,
        })
    }
}