"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Home() {
    return (
        <div className="flex">    
            <div className="flex bg-blue-200 h-[15vh]">
                <UserButton />
            </div>
            <div className="flex bg-blue-400 h-[85vh]">
                Login Complete!
            </div>
        </div>
    )
}
