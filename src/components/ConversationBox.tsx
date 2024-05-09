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
            {props.conversation === "Conversation 1" ? 
                <Avatar>
                    <AvatarImage src="user.avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar> : 
                <Avatar>
                    <AvatarImage src="user.avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>}
        </div>
    )
}

export default ConversationBox;