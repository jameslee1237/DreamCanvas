"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { use, useEffect, useState } from "react";

interface Params {
    messageId: string;
}

export default function MessagePage({
    params } : { params: Params }
) {

    const [currentUser, setCurrentUser] = useState("");
    const [fallback, setfallback] = useState("");

    const messageId = params.messageId;
    const checkUser = () => {
        if (messageId === "1") {
            setCurrentUser("Oliver Manson");
            setfallback("OM");
        } else {
            setCurrentUser("James Lee");
            setfallback("JL");
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div className="flex flex-col relative w-[57vw] overflow-hidden">
            <div className="flex items-center w-full h-[10vh] bg-white">
                <Avatar className="ml-4">
                    <AvatarImage src=""></AvatarImage>
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <div className="flex ml-4">
                    <h1>{currentUser}</h1>
                </div>
            </div>
            <div className="flex w-full h-[75vh] bg-blue-100">
                Message of {params.messageId}
            </div>
            <div className="flex w-full h-[15vh] items-center bg-gray-400">
                <Input placeholder="Type your message here" className="w-4/5 ml-10"/>
                <Button className="ml-8">Send</Button>
            </div>
        </div>        
    )
}