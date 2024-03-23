"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col">    
            <div className="flex bg-blue-200 h-[10vh] justify-between">
                <div className="flex ml-4 items-center">
                    <h1 className="font-bold text-[20px]">DreamCanvas</h1>
                </div>
                <div className="flex mr-4 items-center">
                    <UserButton />
                </div>
            </div>
            <div className="flex bg-blue-400 h-[90vh]">
                Login Complete!
            </div>
        </div>
    )
}
