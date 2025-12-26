import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js";
import { deleteMedia, deleteVideo, uploadMedia } from '../utils/cloudinary.js'
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
export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree, } = req.body;///video infor = public id + url cloudinary
        const { courseId, lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }
        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle;
        }
        if (videoInfo?.videoUrl) {
            lecture.videoUrl = videoInfo.videoUrl;
        }
        if (videoInfo?.publicId) {
            lecture.publicId = videoInfo.publicId;
        }


        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        //ensure the course still had the lecture id if it was not already added
        const course = await Course.findById(courseId);
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(200).json({
            lecture,
            message: "lecture updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to edit Lecture",
            success: false,
        })
    }
}
export const removeCourseAndLectures = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "The course does not exist",
                success: false,
            })
        }
        const lectures = course.lectures;
        await Promise.all(lectures.map(async (lectureId) => {
            try {
                const lecture = await Lecture.findByIdAndDelete(lectureId);
                if (lecture && lecture.publicId) {
                    await deleteVideo(lecture.publicId);
                }
            } catch (err) {
                console.log(`Failed to delete lecture ${lectureId}`, err);
            }
        }));

        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            message: "Course and all associated lectures deleted successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to remove course"
        })
    }
}
export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        //delete lecture object
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not Found to delete"
            })
        }
        //delete cloudinary video of lecture
        if (lecture.publicId) {
            await deleteVideo(lecture.publicId);
        }
        //remove lecture reference from course
        const { courseId } = req.params;
        await Course.updateOne(
            { lectures: lectureId }, //select with given lecture id
            { $pull: { lectures: lectureId } } //remove lecture id from lecture array
        )

        return res.status(200).json({
            message: "Lecture remove successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to remove Lecture",
            success: false,
        })
    }
}
export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        // console.log("SERVER LECTURE: " + lecture);
        if (!lecture) {
            return res.status(400).json({
                message: "Lecture not found",
            })
        }
        return res.status(200).json({
            lecture,
            message: "Lecture GOT"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get Lecture by id",
            success: false,
        })
    }
}

//publish and unpublish course
export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;  //true or false - action
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false
            })
        }
        //update course status based on query parameter
        course.isPublished = publish === "true";
        await course.save();
        return res.status(200).json({
            message: "Course is " + (course.isPublished ? "published" : "unpublished")
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Fail to update course status",
            success: false
        })
    }
}