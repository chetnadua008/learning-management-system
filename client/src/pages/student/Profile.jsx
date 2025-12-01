import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
const Profile = () => {
    return (
        <div className=' border border-l-gray-400 max-w-4xl mx-auto px-4 my-24'>
            <h1 className=' font-bold text-2xl text-center md:text-left'>PROFILE</h1>
            <div className='flex flex-col md:flex-row items-center'>
                <div className=''>
                    <Avatar className='h-30 w-30'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='my-5 md:mx-5'>
                    <h1 className='font-bold text-xl'>
                        Chetna
                    </h1>
                    <p className='text-gray-500 text-sm hover:underline'>
                        Chetnadua36@gmail.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Profile