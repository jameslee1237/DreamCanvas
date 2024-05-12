import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { red, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Input from '@mui/material/Input';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import Comment from "./Comment";
  

const FeedCard = () => {
const [clickedLike, setClickedLike] = useState(true);
const [clickedBM, setClickedBM] = useState(true);
const [val, setVal] = useState("");
const [typed, setTyped] = useState(false);
const [fullval, setfullVal] = useState("");
const [fulltyped, setfullTyped] = useState(false);

const hasTyped = (e: ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setTyped(typedValue.length > 0);
    setVal(typedValue);
}

const hasTypedFull = (e: ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setfullTyped(typedValue.length > 0);
    setfullVal(typedValue);
}

    return (
        <div className="w-[35vw]">
            <Card className="w-full h-full bg-[#3c023e] border-0 flex flex-col">
                <CardHeader>
                    <div className="flex gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="" alt="Avatar" />
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
                        priority={true}
                        width={2500}
                        height={1668}
                    />
                    <div className="flex justify-between -mb-6">
                        <button onClick={() => setClickedLike((prev) => !prev)}>
                            {clickedLike ? <FavoriteBorderIcon fontSize="large" /> : <FavoriteIcon fontSize="large" sx={{ color: red[500]}} />}
                        </button>
                        <button onClick={() => setClickedBM((prev) => !prev)}>
                            {clickedBM ? <BookmarkBorderIcon fontSize="large"/> : <BookmarkIcon fontSize="large" sx={{ color: grey[700]}} />}
                        </button>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col w-full">
                        <div className="flex">
                            <h1 className="text-white">
                                First Comment
                            </h1>
                        </div>
                        <div className="flex">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-gray-500">
                                        See more comments
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogDescription className="h-full">
                                            <div className="flex h-full">
                                                <div className="flex h-full bg-black items-center w-1/2">
                                                    <Image 
                                                        src="/test.png"
                                                        alt="test"
                                                        sizes="512px"
                                                        style={{
                                                            width: "100%",
                                                            height: "auto",
                                                        }}
                                                        priority={true}
                                                        width={2500}
                                                        height={1668}
                                                    />
                                                </div>
                                                <div className="flex flex-col w-1/2 max-h-full">
                                                    <div className="flex ml-4 mt-4 mb-4">
                                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                                            <AvatarImage src="" alt="Avatar" />
                                                            <AvatarFallback className="bg-green-200">OM</AvatarFallback>
                                                        </Avatar>
                                                        <div className="grid gap-1">
                                                            <h1 className="text-[16px] ml-2 font-bold text-black text-muted-foreground mt-1">
                                                                o_martin_0987
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex w-full h-[75%] max-h-full">
                                                        <ScrollArea className="w-full mt-4 mb-4 max-h-[75vh] overflow-hidden">
                                                            <Comment comment="Comment1" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment2" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment3" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment4" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment5" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment6" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment7" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment8" />
                                                            <Separator className="mt-4" />
                                                            <Comment comment="Comment9" /> 
                                                        </ScrollArea>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex mt-4 mx-4">
                                                        <Input fullWidth={true} value={fullval} placeholder="Add a comment..." onChange={hasTypedFull} />
                                                            {fulltyped && (
                                                                <button className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4">
                                                                    Post
                                                                </button>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex w-full">
                            <Input fullWidth={true} placeholder="Add a comment" value={val} onChange={hasTyped} sx={{ input: { color: "white "}}} />
                            {typed && (
                                <button className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4">
                                    Post
                                </button>
                            )}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default FeedCard;