"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationBoxProps {
    id: string;
    conversation: string;
    selected?: boolean;
}

const ConversationBox = (
    props : ConversationBoxProps
) => {
    const selected = props.selected;
    const router = useRouter();

    const handleClick = () => {
        router.push(`/message/${props.id}`)
    }

    return (
        <div className={`flex w-[350px] p-3 items-center space-x-3 hover:bg-slate-300 ${selected ? 'bg-white' : 'bg-inherit'}`}
             onClick={handleClick}>
            {props.id === "1" ? 
                <div className="flex">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="flex ml-4 mt-2">
                        <h1>Oliver Manson</h1>
                    </div>
                </div> 
                : 
                <div className="flex">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="flex ml-4 mt-2">
                        <h1>James Lee</h1>
                    </div>
                </div> 
            }
        </div>
    )
}

export default ConversationBox;