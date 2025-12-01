import { Card, CardContent } from '@/components/ui/card'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import React from 'react'
import { Badge } from '@/components/ui/badge'

const Course = () => {
    return (
        <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className='relative'>
                <img src="https://imgs.search.brave.com/2wYqH-Cjya97ho64AZkEuvIEFfzrrI23AQx3t6gNGZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tb25n/b2RiLW5vZGUubmV0/bGlmeS5hcHAvZG9j/cy9kcml2ZXJzL25v/ZGUvY3VycmVudC9z/dGF0aWMvYjNhZGRk/MGViNDI0NGE4MDJm/YjY0MzUyNjA4NWI0/Y2EvOGU3NjgvTm9k/ZV9DYXRhbG9nLndl/YnA"
                    className='w-full h-36 object-cover rounded-t-lg'
                    alt="course" />
            </div>
            <CardContent className="px-5 pb-4 pt-0 space-y-3">
                <h1 className='hover:underline font-bold text-lg truncate pt-3'>
                    Node JS Complete Course from Scratch
                </h1>
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-3 '>
                        <Avatar className='h-8 w-8'>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className='font-medium text-sm'>Chetna Dua</h1>
                    </div>
                    <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                        Advanced
                    </Badge>
                </div>
                <div className="text-lg font-bold">
                    <span>
                        ₹320
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export default Course