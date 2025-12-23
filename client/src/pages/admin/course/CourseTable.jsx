import { Button } from '@/components/ui/button'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link } from 'react-router-dom'
import { useCreatorCoursesQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom';
const CourseTable = () => {
    const { data, isLoading } = useCreatorCoursesQuery();
    const navigate = useNavigate();
    if (isLoading) return <h1>Loading</h1>
    const courses = data?.courses || [];
    console.log(courses);
    return (
        <div>
            <Button asChild className="text-md">
                {/* as child removes button tag in original html, only styling taken into a tag */}
                <Link to="create">
                    Create a New Course</Link>
            </Button>
            <Table>
                <TableCaption>List of all existing Courses.</TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead className="text-gray-500">Title</TableHead>
                        <TableHead className="text-gray-500">Price</TableHead>
                        <TableHead className="text-gray-500">Status</TableHead>
                        <TableHead className="text-right text-gray-500">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course._id}>
                            <TableCell className="font-medium text-bold">{course.courseTitle}</TableCell>
                            <TableCell>{course.coursePrice ? course.coursePrice : "NA"}</TableCell>
                            <TableCell><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
                            <TableCell className="text-right font-bold"><Button size='sm' variant='ghost' onClick={() => navigate(`${course._id}`)}><Edit /></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </div>
    )
}

export default CourseTable



