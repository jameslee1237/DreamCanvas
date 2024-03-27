"use client";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { OutlinedInput, InputAdornment, createTheme, ThemeProvider } from '@mui/material';
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const handleprofilebutton = () => {
        router.push("/user-page")
    }
    const handlehomebutton = () => {
        router.push("/main")
    }

    const theme = createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: "white",
                        fontcolor: "white",
                        fontSize: '16px',
                    }
                }
            }
        }
    })

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null
    }

    return (
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
                        <button className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                            <MessageIcon className="mr-2"></MessageIcon>
                            Message
                        </button>
                        <button className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                            <NotificationsActiveIcon className="mr-2"></NotificationsActiveIcon>
                            Notifications
                        </button>
                        <button className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                            <AddCircleIcon className="mr-2 mb-1"></AddCircleIcon>
                            Create Post
                        </button>
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
            <div className="flex w-[80vw] text-white">
                <div className="flex flex-col w-[70%]">
                    <div className="flex h-[10%] mt-8 mb-4 items-center justify-center">
                        <ThemeProvider theme={theme}>
                            <OutlinedInput
                                placeholder="Search"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                                size="small"
                            />
                        </ThemeProvider>
                        <button className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4">Search</button>
                    </div>
                    <div className="flex bg-yellow-300 min-h-[84vh]">
                        feed area
                    </div>
                </div>
                <div className="flex w-[30%]">
                    <div className="flex flex-col min-h-screen">
                        <div className="flex mt-10 ml-6">    
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: 
                                            "size-12",
                                    },
                                }}
                                userProfileMode="navigation"
                                userProfileUrl="/user-profile"
                            />
                            <div className="flex flex-col">
                                <div className="grid grid-cols-2">
                                    <h1 className="text-white ml-4 mr-2">{user.firstName}</h1>
                                    <h1>{user.lastName}</h1>
                                </div>
                                <div>
                                    <h1 className="text-slate-400 ml-4">{user.username}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-4 ml-4">
                            <h1 className="text-[#cdc6c6]">Suggested user</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
