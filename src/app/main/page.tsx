"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
        <div className="flex min-h-screen bg-[#3c023e]">    
            <div className="flex flex-col w-[20vw]">
                <div className="flex flex-col items-center mt-8">
                    <h1 className="font-bold text-white text-[30px] mt-2 mb-6">DreamCanvas</h1>
                    <span className="mt-4 bg-black" style={{ width: '15vw', height:"4px"}}></span>
                    <div className="flex flex-col">
                        <button>Home</button>
                        <button>Message</button>
                        <button>Notifications</button>
                        <button>Create Post</button>
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
                <div className="flex flex-col w-[30%]">
                    <div className="flex min-h-screen">
                        <div className="flex mt-10 ml-6">    
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: 
                                            "size-12",
                                    },
                                }}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
