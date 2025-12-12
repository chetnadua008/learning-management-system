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

const CourseTable = () => {
    const courses = [
        {
            title: "Learn React, Best course available in market",
            price: "499 Rs.",
            status: "Published",
            action: "Edit",
        },
    ]
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
                        <TableRow key={course.title}>
                            <TableCell className="font-medium text-bold">{course.title}</TableCell>
                            <TableCell>{course.price}</TableCell>
                            <TableCell>{course.status}</TableCell>
                            <TableCell className="text-right font-bold">{course.action}</TableCell>
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



