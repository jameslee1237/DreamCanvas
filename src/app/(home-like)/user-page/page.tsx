"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export default function UserPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [images, setImages] = useState<string[]>([]);
  const [postids, setPostIds] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const user_id = getCurrentUser().userData.id;

  useEffect(() => {
    if (user_id !== "") {
      const fetchPost = async () => {
        try {
          const post = await fetch(
            "/api/user?authorId=" + user_id + "&post=true"
          );
          const data = await post.json();
          const images = data.user.posts.map((item: any) => item.image);
          const postids = data.user.posts.map((item: any) => item.id);
          setImages(images);
          setPostIds(postids);
          setFollowing(data.user.followingIds.length.toString());
          setFollowers(data.user.followedByIds.length.toString());
        } catch (error) {
          console.log(error);
        }
      };
      fetchPost();
    }
  }, [user_id]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="flex ml-6 w-[75vw] justify-center">
      <div className="flex">
        <Separator orientation="vertical" className="bg-black" />
      </div>
      <div className="flex w-full flex-col items-center mt-10">
        <Avatar className="h-36 w-36 mb-4">
          <AvatarImage src={user.imageUrl}></AvatarImage>
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="flex">
          <h1 className="text-[30px] font-bold">{user.username}</h1>
        </div>
        <div className="flex mt-4 mb-4 justify-between font-semibold">
          <table className="w-[15vw]">
            <tbody>
              <tr>
                <th>{images.length}</th>
                <th>{following}</th>
                <th>{followers}</th>
              </tr>
              <tr>
                <th>Posts</th>
                <th>Followers</th>
                <th>Following</th>
              </tr>
            </tbody>
          </table>
        </div>
        <Separator className="bg-black w-[60vw]" />
        <div className="flex items-center w-full justify-center">
          <Tabs defaultValue="account" className="max-w-[70vw] mt-4">
            <TabsList className="flex items-center bg-inherit text-black">
              <TabsTrigger value="account">Posts</TabsTrigger>
              <TabsTrigger value="password">Saved Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="text-center flex">
              <div className="flex flex-col max-w-full justify-center">
                {images ? (
                  <div className="flex flex-wrap justify-start gap-x-8 gap-y-4">
                    {images.map((image, index) => (
                      <PostCard
                        key={image}
                        image={image}
                        postid={postids[index]}
                      />
                    ))}
                  </div>
                ) : (
                  <div>
                    <Skeleton className="w-[300px] h-[200px] rounded-lg" />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
