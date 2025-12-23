import LoadingSpinner from '@/components/LoadingSpinner'
import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCourseByIdQuery } from '@/features/api/courseApi'
import { Description } from '@radix-ui/react-dialog'
import { Divide, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
const CourseTab = () => {
    const params = useParams();     //app.jsx /course/:courseId same name to receive
    const courseId = params.courseId;
    const { data: courseByIdData, isLoading: courseByIdIsLoading } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
    useEffect(() => {
        const course = courseByIdData?.course;
        if (course) {
            setInput({
                courseTitle: course.courseTitle, // specific
                subTitle: course.subTitle,       // specific
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: course.courseThumbnail // or course.courseThumbnail.url
            });
            if (course.courseThumbnail) {
                setPreviewThumbnail(course.courseThumbnail);
            }

        }

    }, [courseByIdData])

    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
    //hook 
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
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

    const isPublish = true;
    if (courseByIdIsLoading) {
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
                    <Button variant='outline'>
                        {
                            isPublish ? "Unpublish" : "Publish"
                        }
                    </Button>
                    <Button>Remove Course</Button>
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
                            value={input.courseTitle}
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
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder='become a full stack developer in 2 months from zero to hero'
                        >
                        </Input>
                    </div>
                    <div>
                        <Label>
                            Description
                        </Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categories</SelectLabel>
                                        {
                                            categories.map((cat) => <SelectItem value={cat}>{cat}</SelectItem>
                                            )
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Level</SelectLabel>
                                        {
                                            levels.map((level) => <SelectItem value={level}>{level}</SelectItem>
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
                                value={input.coursePrice}
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