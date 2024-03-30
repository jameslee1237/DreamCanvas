import Image from "next/image";
import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { red, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
  } from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";

const FeedCard = () => {
const [clickedLike, setClickedLike] = useState(true);
const [clickedBM, setClickedBM] = useState(true);

    return (
        <div className="w-[35vw]">
            <Card className="w-full h-full bg-[#3c023e] border-0 flex flex-col">
                <CardHeader>
                    <div className="flex gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <h1 className="text-md text-white text-muted-foreground mt-1">
                                o_martin_0987
                            </h1>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Image 
                        src="/test.png"
                        alt="test"
                        sizes="35vw"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                        width={2500}
                        height={1668}
                    />
                    <div className="flex justify-between">
                        <button onClick={() => setClickedLike((prev) => !prev)}>
                            {clickedLike ? <FavoriteBorderIcon fontSize="large" /> : <FavoriteIcon fontSize="large" sx={{ color: red[500]}} />}
                        </button>
                        <button onClick={() => setClickedBM((prev) => !prev)}>
                            {clickedBM ? <BookmarkBorderIcon fontSize="large"/> : <BookmarkIcon fontSize="large" sx={{ color: grey[700]}} />}
                        </button>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col">
                        <h1 className="text-white">
                            Comments
                        </h1>
                    </div>
                    
                </CardFooter>
            </Card>
        </div>
    )
}

export default FeedCard;