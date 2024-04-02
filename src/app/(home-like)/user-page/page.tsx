"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/components/PostCard";


export default function UserPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const id = "1"


    if (!isLoaded || !isSignedIn) {
        return null
    }

    return (
        <div className="flex ml-6">
            <div className="flex">
                <Separator orientation="vertical" className="bg-black" />
            </div>
            <div className="flex w-[70vw] flex-col items-center mt-10">
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
                        10
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
                <Separator className="bg-black ml-[50px] w-[60vw]"/>
                <div className="flex items-center">
                    <Tabs defaultValue="account" className="">
                        <TabsList className="flex items-center bg-inherit text-black">
                            <TabsTrigger value="account">Posts</TabsTrigger>
                            <TabsTrigger value="password">Saved Posts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="text-center">
                            <PostCard postid="1" />
                        </TabsContent>
                        <TabsContent value="password" className="text-center">
                            <PostCard postid="2" />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}