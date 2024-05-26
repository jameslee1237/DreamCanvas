import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CommentProps {
    comment: string;
    authorId: string;
    NoAvatar?: boolean;
}

const Comment = (
    { comment, authorId, NoAvatar }: CommentProps 
) => {
    const [username, setUsername] = useState(""); 

    const getUserId = async (authorId: string) => {
        try {
            const res = await fetch(`/api/user?authorId=${authorId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await res.json();
            setUsername(data.user.username);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserId(authorId);
    }, [authorId]);

    return (
        <div className="flex w-full items-center mt-4">
            <div className="flex">
                {!NoAvatar && <Avatar className="hidden h-9 w-9 ml-4 sm:flex">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback className="bg-green-200">PL</AvatarFallback>
                </Avatar>}
                {!NoAvatar ?
                    <div className="grid gap-1">
                        <h1 className="text-[16px] ml-2 font-bold text-black text-muted-foreground mt-2">
                            {username}
                        </h1>
                    </div>
                    :
                    <div className="flex">
                        <h1 className="text-[16px] font-bold text-black text-muted-foreground">
                            {username}
                        </h1>
                    </div>}
            </div>
            <div className="flex">
                <h1 className="text-black ml-4">
                    {comment}
                </h1>
            </div>
        </div>
    )
}

export default Comment;