"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Home() {
    return (
        <div>
            <UserButton />
            Login Complete!
        </div>
    )
}