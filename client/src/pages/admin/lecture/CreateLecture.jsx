import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateCourseMutation, useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'


const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState('')
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();
    const [createLecture, { data, error, isSuccess, isLoading }] = useCreateLectureMutation();
    const { data: lectureData, isLoading: isLectureLoading, isSuccess: isLectureSuccess, isError: lectureError } = useGetCourseLectureQuery(courseId);
    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId });
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Lecture created successfully")
        }
        if (error) {
            toast.error(error.data.message || "cant create lecture")
        }
    }, [isSuccess, error])
    if (isLectureSuccess) console.log(lectureData)
    return (
        <div className='flex-1 mx-10'>
            <div className=''>
                <h1 className='font-bold text-xl'>Let's add lecture. Add Details for adding a new Lecture</h1>
                <p className='text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dolor.
                </p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} placeholder='your title name' type='text' name='lectureTitle' />
                </div>

                <div className='flex items-center gap-2'>
                    <Button asChild variant="outline">
                        <Link to={`/admin/course/${courseId}`}>Back to Edit Course</Link>
                    </Button>
                    <Button onClick={createLectureHandler} >
                        {
                            isLoading ?
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                                    Please Wait
                                </>
                                : "Create Lectures"
                        }
                    </Button>
                </div>
                <div className='mt-10'>
                    {
                        isLectureLoading ? <p>Loading Lectures........</p> : lectureError ? <p>Failed To Load Lectures.....</p> : lectureData.lectures.length === 0 ? <p>No Lectures added yet!</p> : (
                            lectureData.lectures.map((lecture, index) => (
                                <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId} />
                            ))
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default CreateLecture