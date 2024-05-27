import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Comment from "@/components/Comment";
import { Skeleton } from "@/components/ui/skeleton"
import { feedcardutil } from "@/app/actions/feedcardutil";

interface FeedCardProps {
    image: string;
    postid: string;
}

const FeedCard = (
    { image, postid } : FeedCardProps
) => {
    const [clickedLike, setClickedLike] = useState(true);
    const [clickedBM, setClickedBM] = useState(true);
    const [comments, setComments] = useState<string[] | null>(null);
    const [authorIds, setAuthorIds] = useState<string[] | null>(null);
    const [p_authorId, setP_authorId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const effectRan = useRef(false);

    const { dialogOpen, val, typed, fullval, fulltyped, 
            setDialogOpen, setVal, setfullVal,
            hasTyped, hasTypedFull, handleDialogOpenChange } = feedcardutil();
    const id = getCurrentUser().userData.id;

    const getAuthorId = async (post_id: string) => {
        try {
            const res = await fetch(`/api/post?post_id=${post_id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch post");
            }
            const data = await res.json();
            const p_authorId = data.post.authorId;
            const res_user = await fetch(`/api/user?authorId=${p_authorId}`);
            if (!res_user.ok) {
                throw new Error("Failed to fetch user");
            }
            const data_user = await res_user.json();
            return data_user;
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlefullValComment = async () => {
        try {
            const commentData = {
                comment: fullval,
                postId: postid,
                authorId: id,
            }
            const res = await fetch("/api/comment/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });
            if (!res.ok) {
                throw new Error("Failed to create comment");
            }
            setfullVal("");

            await getComments(postid);

        } catch (error) {
            console.log(error);
        }
    }

    const handleValComment = async () => {
        try {
            const commentData = {
                comment: val,
                postId: postid,
                authorId: id,
            }
            const res = await fetch("/api/comment/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });
            if (!res.ok) {
                throw new Error("Failed to create comment");
            }
            setVal("");

        } catch (error) {
            console.log(error);
        }
    }

    const getComments = async (p_id: string) => {
        try {
            const res = await fetch(`/api/comment?postId=${p_id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch comments");
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        if (effectRan.current) return;

        const fetchData = async () => {
            const data = await getAuthorId(postid);
            const data2 = await getComments(postid);
            setUserName(data.user.userName);
            setProfileImage(data.user.profileImage);
            setComments(data2.comments.map((comment: any) => comment.comment));
            setAuthorIds(data2.comments.map((comment: any) => comment.authorId));
        }
        if (postid) {
            fetchData();
            effectRan.current = true;
        }
    }, [postid]);

    return (
        <div className="w-[35vw]">
            <Card className="w-full h-full bg-[#3c023e] border-0 flex flex-col">
                <CardHeader>
                    <div className="flex gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={profileImage} alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <h1 className="text-md text-white text-muted-foreground mt-1">
                                {userName}
                            </h1>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <button onClick={() => setDialogOpen(true)} className="w-full">
                        {image ? <Image
                            src={image}
                            alt="test"
                            sizes="35vw"
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                            priority={true}
                            width={2500}
                            height={1668}
                        /> : <div>
                            <Skeleton className="w-[400px] h-[400px] rounded-md" />
                        </div>}
                    </button>
                    <div className="flex justify-between -mb-6">
                        <button onClick={() => setClickedLike((prev) => !prev)}>
                            {clickedLike ? <FavoriteBorderIcon fontSize="large" /> : <FavoriteIcon fontSize="large" sx={{ color: red[500] }} />}
                        </button>
                        <button onClick={() => setClickedBM((prev) => !prev)}>
                            {clickedBM ? <BookmarkBorderIcon fontSize="large" /> : <BookmarkIcon fontSize="large" sx={{ color: grey[700] }} />}
                        </button>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col w-full">
                        <div className="flex">
                            {comments && authorIds && <Comment comment={comments[0]} authorId={authorIds[0]} NoAvatar={true} /> }
                        </div>
                        <div className="flex">
                            <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
                                <DialogTrigger asChild>
                                    <button className="text-gray-500">
                                        See more comments
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <div className="flex h-full">
                                        <div className="flex h-full bg-black items-center w-1/2">
                                            {image ? <Image
                                                src={image}
                                                alt="test"
                                                sizes="512px"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                                priority={true}
                                                width={2500}
                                                height={1668}
                                            /> : <div>
                                                    <Skeleton className="w-[512px] h-[400px] rounded-md" />
                                                </div>
                                            }
                                        </div>
                                        <div className="flex flex-col w-1/2 max-h-full">
                                            <div className="flex ml-4 mt-4 mb-4">
                                                <Avatar className="hidden h-9 w-9 sm:flex">
                                                    <AvatarImage src={profileImage} alt="Avatar" />
                                                    <AvatarFallback className="bg-green-200">OM</AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                    <h1 className="text-[16px] ml-2 font-bold text-black text-muted-foreground mt-1">
                                                        {userName}
                                                    </h1>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="flex w-full h-[75%] max-h-full">
                                                <ScrollArea className="w-full mb-4 max-h-[75vh] overflow-hidden">
                                                    {comments && authorIds && comments.map((commentf, index) => (
                                                        <div key={index}>
                                                            <Comment
                                                                comment={commentf}  
                                                                authorId={authorIds[index]} />
                                                            <Separator className="mt-4" />
                                                        </div>
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                            <Separator />
                                            <div className="flex mt-4 mx-4">
                                                <Input fullWidth={true} value={fullval} placeholder="Add a comment..." onChange={hasTypedFull} />
                                                {fulltyped && (
                                                    <button onClick={handlefullValComment} className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4">
                                                        Post
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex w-full">
                            <Input fullWidth={true} placeholder="Add a comment" value={val} onChange={hasTyped} sx={{ input: { color: "white " } }} />
                            {typed && (
                                <button onClick={handleValComment} className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4">
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