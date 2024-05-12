import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Comment = ({comment} : {comment: string}) => {
    return (
        <div className="flex w-full ml-4 items-center mt-4">
            <div className="flex">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback className="bg-green-200">PL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <h1 className="text-[16px] ml-2 font-bold text-black text-muted-foreground mt-2">
                        p_loy9
                    </h1>
                </div>
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