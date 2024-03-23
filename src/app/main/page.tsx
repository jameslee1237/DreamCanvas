"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Home() {
    return (
        <div className="flex min-h-screen bg-[#20151e]">    
            <div className="flex flex-col w-[20vw]">
                <div className="flex flex-col items-center mt-8">
                    <h1 className="font-bold text-white text-[20px] mb-4">DreamCanvas</h1>
                    <UserButton 
                        afterSignOutUrl="/"
                    />
                </div>
            </div>
            <div className="flex w-[80vw] text-white">
                <div className="flex flex-col w-[70%]">
                    <div className="flex bg-red-300 h-[10%] mt-8 mb-4 items-center ">
                        search bar
                    </div>
                    <div className="flex bg-yellow-300 max-h-dvh">
                        feed area
                    </div>
                </div>
                <div className="flex flex-col w-[30%]">
                    <div className="flex bg-green-300 justify-center">
                        side bar-ish
                    </div>
                </div>
            </div>
        </div>
    )
}
