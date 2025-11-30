import { Menu, School } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '@/DarkMode'
import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@radix-ui/react-dropdown-menu'

const Navbar = () => {
    const user = true;
    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* desktop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className="flex items-center gap-2">
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                </div>
                {/* user icon and dark mode icon */}
                <div className="flex items-center gap-8">
                    {
                        user ? (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {/* avatar */}
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        My Learning
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Edit Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Dashboard
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>) : (
                            <div className="flex items-center gap-2">
                                <button variant="outline">Login</button>
                                <button>Signup</button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>
            </div>
            {/* mobile device */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className='font-extrabold text-2xl'>E-Learning</h1>                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar

const MobileNavbar = () => {
    const role = "instructor";
    return (
        <Sheet className="mr-4">
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode />

                </SheetHeader>
                <Separator className='mr-2' />
                <nav className="flex flex-col space-y-4">
                    <span>
                        My Learning
                    </span>
                    <span>
                        Edit Profile
                    </span>
                    <p>
                        Log Out
                    </p>
                </nav>
                {
                    role === "instructor" && (
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="subnit">Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }

            </SheetContent>
        </Sheet>
    );
}