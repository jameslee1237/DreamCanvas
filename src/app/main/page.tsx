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
                <div className="flex w-[70%]">
                    Login Complete
                </div>
                <div className="flex w-[30%]">
                    Side bar ish
                </div>
            </div>
        </div>
    )
}
