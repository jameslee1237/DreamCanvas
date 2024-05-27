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

    const temp_convo: {[key: string]: string[]} = {
        "1": ["Hello", "Hi", "How are you?", "Good, you?"],
        "2": ["Hey did you watch the game?", "Yeah, it was great!"],
    }

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
    const getConvo =(id: string) => {
        return temp_convo[id].reverse();
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
            <div className="flex flex-col-reverse space-y-3 space-y-reverse w-full h-[75vh] bg-blue-100">
                {getConvo(messageId).map((msg: string, index: number) => (
                    <div key={msg}
                        className={`flex max-w-[60%] w-fit px-4 py-3 mb-3
                                    justify-${index %2 === 0 ? "start" : "end"} 
                                  ${index % 2 === 0 ? "bg-green-300 rounded-l-md ml-auto" : "bg-gray-500 rounded-r-md"}
                                   `}>
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex w-full h-[15vh] items-center bg-gray-400">
                <Input placeholder="Type your message here" className="w-4/5 ml-10"/>
                <Button className="ml-8">Send</Button>
            </div>
        </div>        
    )
}