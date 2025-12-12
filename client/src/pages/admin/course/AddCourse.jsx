import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';


const AddCourse = () => {
    //state
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");

    //hook
    const [createCourse, { data, error, isLoading, isSuccess }] = useCreateCourseMutation()


    //effects
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created successfully!");
            navigate('/admin/dashboard')
        }
        if (error) {
            const errorMessage = error?.data?.message || "Failed to create course";
            toast.error(errorMessage);
        }
    }, [isSuccess, error, data]);

    //handler
    const categoryHandler = (cat) => {
        setCategory(cat);
    }

    const createCourseHandler = async () => {
        createCourse({ courseTitle, category });
    }

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
    //render
    return (
        <div className='flex-1 mx-10'>
            <div className=''>
                <h1 className='font-bold text-xl'>Add Details for adding a new Course</h1>
                <p className='text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dolor.
                </p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder='your course name' type='text' name='courseTitle' />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={categoryHandler}>
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
                <div className='flex items-center gap-2'>
                    <Button asChild variant="outline">
                        <Link to="/admin/course">Back</Link>
                    </Button>
                    <Button onClick={createCourseHandler}>
                        {
                            isLoading ?
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                                    Please Wait
                                </>
                                : "Create"
                        }
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default AddCourse