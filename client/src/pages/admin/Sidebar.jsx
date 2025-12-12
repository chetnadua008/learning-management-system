import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react';
import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="flex h-[calc(100vh-4rem)] w-full pt-16">
            {/* --- LEFT SIDEBAR --- */}
            <div className="hidden lg:block w-64 bg-gray-50 border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex flex-col gap-2 p-5">
                    <Link
                        to='/admin/dashboard'
                        className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 transition-all'
                    >
                        <ChartNoAxesColumn size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link
                        to='/admin/course'
                        className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 transition-all'
                    >
                        <SquareLibrary size={20} />
                        <span className="font-medium">Courses</span>
                    </Link>
                </div>
            </div>

            {/* --- RIGHT CONTENT AREA --- */}
            <div className="flex-1 overflow-y-auto bg-white p-8 dark:bg-black">
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar;