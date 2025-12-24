import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js";
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
        const updatedData = { courseTitle, subTitle, description, category, courseLevel, coursePrice };
        let newThumbnailUpload;
        if (newThumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split('/').pop().split(".")[0];
                await deleteMedia(publicId)     //delete old image
            }
            //upload new thumbnail on cloudinary
            newThumbnailUpload = await uploadMedia(newThumbnail.path)
            updatedData.courseThumbnail = newThumbnailUpload.secure_url;
        }

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
export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        return res.status(200).json({ course })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get Course by id",
            success: false,
        })
    }
}

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;
        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture title and course Id are required",
                success: false,
            })
        };

        //create lecture
        const lecture = await Lecture.create({ lectureTitle })
        const course = await Course.findById(courseId);
        if (course) {
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(201).json({
            lecture,
            message: "lecture created successfully"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create Lecture",
            success: false,
        })
    }

}
export const getCourseLectures = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures"); //replace object id with actual document   
        if (!course) res.status(404).json({
            message: "Course Not Found"
        })
        res.status(200).json({
            lectures: course.lectures,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get Lecture",
            success: false,
        })
    }
}
// export const editLecture = async (req, res) => {
//     try {
//         const { lectureTitle, videoInfo, isPreviewFree, } = req.body;
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Failed to edit Lecture",
//             success: false,
//         })
//     }
// }