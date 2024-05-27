"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [images, setImages] = useState<string[]>([]);
    const [postids, setPostIds] = useState<string[]>([]);

    if (!isLoaded || !isSignedIn) {
        return null
    }


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await fetch("/api/user");
                const data = await post.json();
                setImages(data.posts);
                setPostIds(data.postIds);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPost();
    }, []);

    return (
        <div className="flex ml-6 w-[75vw]">
            <div className="flex">
                <Separator orientation="vertical" className="bg-black" />
            </div>
            <div className="flex w-full flex-col items-center mt-10">
                <Avatar className="h-36 w-36 mb-4">
                    <AvatarImage src={user.imageUrl}></AvatarImage>
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="flex">
                    <h1 className="text-[30px] font-bold">
                        {user.username}
                    </h1>
                </div>
                <div className="flex justify-between w-[13vw] mt-4 font-semibold">
                    <h1>
                        {images.length}
                    </h1>
                    <h1>
                        10
                    </h1>
                    <h1>
                        10
                    </h1>
                </div>
                <div className="flex justify-between w-[20vw] font-semibold mb-8">
                    <h1 className="ml-11">
                        Posts
                    </h1>
                    <h1 className="ml-4">
                        Followers
                    </h1>
                    <h1 className="mr-6">
                        Following
                    </h1>
                </div>
                <Separator className="bg-black ml-[30px] w-[60vw]" />
                <div className="flex items-center w-full justify-center">
                    <Tabs defaultValue="account" className="max-w-[70vw] mt-4 ml-10">
                        <TabsList className="flex items-center bg-inherit text-black">
                            <TabsTrigger value="account">Posts</TabsTrigger>
                            <TabsTrigger value="password">Saved Posts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="text-center flex">
                            <div className="flex flex-col max-w-full justify-center">
                                {images ?
                                    <div className="flex flex-wrap justify-start gap-4 ml-[60px]">
                                        {images.map((image, index) => (
                                            <PostCard key={image} image={image} postid={postids[index]} />
                                        ))}
                                    </div>
                                    : <div>
                                        <Skeleton className="w-[300px] h-[200px] rounded-lg" />
                                    </div>}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}