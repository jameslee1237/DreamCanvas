"use client";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { getCurrentUser } from "../actions/getCurrentUser";
import CreatePostButton from "@/components/CreatePostButton";
import NotifButton from "@/components/NotifButton";
import { Skeleton } from "@/components/ui/skeleton";

interface EDlayoutProps {
    children: React.ReactNode;
    dialog: React.ReactNode;
}

export default function ExperienceDetailLayout({children, dialog} : EDlayoutProps) {
    const router = useRouter();

    const handleprofilebutton = () => {
        router.push("/user-page")
    }
    const handlehomebutton = () => {
        router.push("/main")
    }
    const handlemessageButton = () => {
        router.push("/message/1")
    }
    const handlesettingsButton = () => {
        router.push("/user-profile")
    }
    
    const { isLoaded, loading, userData } = getCurrentUser();

    return loading || !isLoaded ?
        (
            <div className="flex min-h-screen bg-[#3c023e] flex-col">
                <div className="flex flex-col w-[20vw] fixed">
                    <div className="flex flex-col items-center mt-8">
                        <h1 className="font-bold text-white text-[30px] mt-2 mb-6">Dream<span className="font-bold text-[30px] text-[#FECC3D]">Canvas</span></h1>
                        <Skeleton className="w-[20vw] h-[80vh] rounded-xl ml-10" />
                    </div>
                </div>
                <div className="flex flex-col w-[80vw] ml-[20vw] mt-[5vh]">
                    <Skeleton className="w-[70vw] h-[40vh] rounded-xl ml-20" />
                    <Skeleton className="w-[70vw] h-[30vh] rounded-xl mt-20 ml-20 " />
                </div>
            </div>
        )
        : (
            <>
                <div className="flex min-h-screen bg-[#3c023e]">
                    <div className="flex flex-col w-[20vw] fixed">
                        <div className="flex flex-col items-center mt-8">
                            <h1 className="font-bold text-white text-[30px] mt-2 mb-6">Dream<span className="font-bold text-[30px] text-[#FECC3D]">Canvas</span></h1>
                            <span className="mt-4 bg-black" style={{ width: '15vw', height: "4px" }}></span>
                            <div className="flex flex-col justify-between mt-8 h-[45vh] w-[15vw] text-[20px] font-bold">
                                <button onClick={handlehomebutton} className="py-3 w-[100%] rounded-md hover:bg-slate-500 flex justify-center">
                                    <HomeIcon className="mr-2 mt-1"></HomeIcon>
                                    Home
                                </button>
                                <button onClick={handlemessageButton} className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                                    <MessageIcon className="mr-2"></MessageIcon>
                                    Message
                                </button>
                                <div className="flex flex-col">
                                    <NotifButton />
                                    <CreatePostButton userId={userData.id} />
                                </div>
                                <button onClick={handleprofilebutton} className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                                    <AccountCircleIcon className="mr-2 mb-1"></AccountCircleIcon>
                                    Profile
                                </button>
                            </div>
                            <span className="mt-8 bg-black" style={{ width: '15vw', height: "4px" }}></span>
                            <div className="flex flex-col mt-20 text-[20px] w-[15vw] font-bold">
                                <button onClick={handlesettingsButton} className="py-3 w-[100%] rounded-md hover:bg-gray-400">
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
                    <div className="flex ml-[18.5vw]">
                        {children}
                        {dialog}
                    </div>
                </div>
            </>
        )
}