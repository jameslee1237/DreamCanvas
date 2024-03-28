"use client";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link";
  
export default function ExperienceDetailLayout ({
    children,
} : {
    children: React.ReactNode
}) {
    const router = useRouter();

    const handleprofilebutton = () => {
        router.push("/user-page")
    }
    const handlehomebutton = () => {
        router.push("/main")
    }
    const handlemessageButton = () => {
        router.push("/message")
    }

    return (
        <>
            <div className="flex min-h-screen bg-[#3c023e]">    
                <div className="flex flex-col w-[20vw]">
                    <div className="flex flex-col items-center mt-8">
                        <h1 className="font-bold text-white text-[30px] mt-2 mb-6">DreamCanvas</h1>
                        <span className="mt-4 bg-black" style={{ width: '15vw', height:"4px"}}></span>
                        <div className="flex flex-col justify-between mt-8 h-[45vh] w-[15vw] text-[20px] font-bold">
                            <button onClick={handlehomebutton} className="py-3 w-[100%] rounded-md hover:bg-slate-500 flex justify-center">
                                <HomeIcon className="mr-2 mt-1"></HomeIcon>
                                Home
                            </button>
                            <button onClick={handlemessageButton} className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                                <MessageIcon className="mr-2"></MessageIcon>
                                Message
                            </button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                                        <NotificationsActiveIcon className="mr-2"></NotificationsActiveIcon>
                                        Notifications
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <ScrollArea className="h-full w-full rounded-md">
                                        Notifications will be here
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                            <Link href="?modal=true">
                                <button className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                                    <AddCircleIcon className="mr-2 mb-1"></AddCircleIcon>
                                    Create Post
                                </button>
                            </Link>   
                            <button onClick={handleprofilebutton} className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                                <AccountCircleIcon className="mr-2 mb-1"></AccountCircleIcon>
                                Profile
                            </button>
                        </div>
                        <span className="mt-8 bg-black" style={{ width: '15vw', height:"4px"}}></span>
                        <div className="flex flex-col mt-20 text-[20px] w-[15vw] font-bold">
                            <button className="py-3 w-[100%] rounded-md hover:bg-gray-400">
                                <SettingsIcon className="mr-2 mb-1"></SettingsIcon>
                                Setting
                            </button>
                            <SignOutButton>
                                <button className="py-3 w-[100%] rounded-md hover:bg-red-500">
                                    <LogoutIcon className="mr-2 mb-1"></LogoutIcon>
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </div>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}