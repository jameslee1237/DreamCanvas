"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput, InputAdornment, createTheme, ThemeProvider } from '@mui/material';
import FeedCard from "@/components/FeedCard";
import UserCard from "@/components/UserCard";

export default function Home() {

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
                    <div className="flex flex-col min-h-[84vh]">
                        <FeedCard />
                        <FeedCard />
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
                        <div className="flex flex-col mt-4 ml-4">
                            <UserCard />
                        </div>
                    </div>
                </div>
            </div>
    )
}
