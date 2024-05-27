import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

interface CommentProps {
    comment: string;
    authorId: string;
    NoAvatar?: boolean;
}

const Comment = (
    { comment, authorId, NoAvatar }: CommentProps 
) => {
    const [username, setUsername] = useState<string | undefined>(""); 
    const [profileImage, setProfileImage] = useState<string | undefined>("");
    const getUserId = async (authorId: string) => {
        try {
            const res = await fetch(`/api/user?authorId=${authorId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserId(authorId);
            setUsername(data.user.userName);
            setProfileImage(data.user.profileImage);
        };
        if (authorId) {
            fetchData();
        }
    }, [authorId]);

    if (username === "") {
        return (
            <div>
                <Skeleton className="w-[90%] h-[50px]" />
            </div>
        )
    }

    if (comment === "") {
        return (
            <div></div>
        )
    }
    return (
        <div className="flex w-full items-center mt-4">
            <div className="flex">
                {!NoAvatar && username !== undefined && <Avatar className="hidden h-9 w-9 ml-4 sm:flex">
                    <AvatarImage src={profileImage} alt="Avatar" />
                    <AvatarFallback className="bg-green-200">{username[0] + username[1]}</AvatarFallback>
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