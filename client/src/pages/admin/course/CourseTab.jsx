import LoadingSpinner from '@/components/LoadingSpinner'
import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation, useRemoveCourseMutation } from '@/features/api/courseApi'
import { Description } from '@radix-ui/react-dialog'
import { Divide, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
const CourseTab = () => {
    const params = useParams();     //app.jsx /course/:courseId same name to receive
    const courseId = params.courseId;
    //hook 
    const [input, setInput] = useState(null);           //never initialize state until actual course data arrive (the "" are cached and form doesnt update with new data)

    const { data: courseByIdData, isLoading: courseByIdIsLoading, isSuccess: courseByIdIsSuccess, refetch } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
    useEffect(() => {
        const course = courseByIdData?.course;
        if (course) {
            setInput({      //initialize when course data come
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: course.courseThumbnail
            });
            if (course.courseThumbnail) {
                setPreviewThumbnail(course.courseThumbnail);
            }
        }

    }, [courseByIdData])
    const [publishCourse, { }] = usePublishCourseMutation();
    const [removeCourse, { data: removeData, isSuccess: removeIsSuccess, error: removeError }] = useRemoveCourseMutation();
    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const navigate = useNavigate();

    //handler
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    };
    const selectCategory = (val) => {
        setInput({ ...input, category: val });
    }
    const selectCourseLevel = (val) => {
        setInput({ ...input, courseLevel: val });

    }
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            //convert file to url for preview
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }
    const updateCourseHandler = async () => {
        const formData = new FormData();
        if (input.courseTitle) formData.append("courseTitle", input.courseTitle);
        if (input.subTitle) formData.append("subTitle", input.subTitle);
        if (input.description) formData.append("description", input.description);
        if (input.category) formData.append("category", input.category);
        if (input.courseLevel) formData.append("courseLevel", input.courseLevel);
        if (input.coursePrice) formData.append("coursePrice", input.coursePrice);
        if (input.courseThumbnail) formData.append("courseThumbnail", input.courseThumbnail);
        await editCourse({ formData, courseId });
    }
    const publishStatusHandler = async (action) => {

        try {
            const res = await publishCourse({ courseId, query: action });
            if (res.data) {
                refetch();
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("failed to update course status");
        }
    }
    const removeCourseHandler = async () => {
        try {
            await removeCourse({ courseId });
        } catch (error) {
            toast.error("Failed to remove course");
        }
    }
    useEffect(() => {
        if (removeIsSuccess) {
            toast.success(removeData?.message || "course and lectures removed success")
        }
        if (removeError) {
            toast.error(removeError.data.message || "Failed to remove course")
        }
    }, [removeIsSuccess, removeData, removeError])
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course updated");
        }
        if (error) {
            toast.error(error.data.message || "Failed to updated")
        }
    }, [isSuccess, error,])
    const categories = [
        "Next JS",
        "Data Science",
        "Frontend development",
        "Backend development",
        "Full Stack development",
        "Mern Stack development",
        "Javascript",
        "Python",
        "Docker",
        "Mongo DB",
        "HTML"
    ];
    const levels = [
        "Beginner",
        'Medium',
        'Advance'
    ]

    // const isPublish = true;
    if (!input) {
        return (
            <h1>Loading.....</h1>
        );
    }
    return (
        <Card>
            <CardHeader className='flex flex-row justify-between'>
                <div>
                    <CardTitle>
                        Basic Course Information
                    </CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you are done
                    </CardDescription>
                </div>
                <div className='space-x-2.5'>
                    <Button variant='outline' disabled={courseByIdData?.course?.lectures?.length === 0} onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
                        {
                            courseByIdData?.course.isPublished ? "Unpublish" : "Publish"
                        }
                    </Button>
                    <Button onClick={removeCourseHandler}>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 mt-5'>
                    <div>
                        <Label>
                            Course Title
                        </Label>
                        <Input
                            type='text'
                            name='courseTitle'
                            value={input.courseTitle ?? ""}
                            onChange={changeEventHandler}
                            placeholder='Ex. Full stack developer'
                        >
                        </Input>
                    </div>
                    <div>
                        <Label>
                            Sub Title
                        </Label>
                        <Input
                            type='text'
                            name='subTitle'
                            value={input.subTitle ?? ""}
                            onChange={changeEventHandler}
                            placeholder='become a full stack developer in 2 months from zero to hero'
                        >
                        </Input>
                    </div>
                    <div>
                        <Label>
                            Description
                        </Label>
                        <RichTextEditor key={courseId} input={input} setInput={setInput} />
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select value={input.category} onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categories</SelectLabel>
                                        {
                                            categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            )
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Level</SelectLabel>
                                        {
                                            levels.map((level) => <SelectItem key={level} value={level}>{level}</SelectItem>
                                            )
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-fit'>
                            <Label>Price in INR</Label>
                            <Input
                                type='number'
                                name='coursePrice'
                                value={input.coursePrice ?? ""}
                                onChange={changeEventHandler}
                                placeholder='299'

                            ></Input>
                        </div>

                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type='file'
                            accept='image/*'
                            className='w-fit'
                            onChange={selectThumbnail}
                        >
                        </Input>
                        {
                            previewThumbnail && (<img className="w-64 my-2" alt='course Thumbnail' src={previewThumbnail}></img>)
                        }
                    </div>
                    <div>
                        <Button onClick={() => navigate('/admin/course')} variant='outline'>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler}>{
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                                </>
                            ) : "Update"
                        }</Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default CourseTab