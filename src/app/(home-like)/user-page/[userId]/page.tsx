"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface UserPageProps {
  userId: string;
}

export default function UserPage({ params }: { params: UserPageProps }) {
  const [images, setImages] = useState<string[]>([]);
  const [postids, setPostIds] = useState<string[]>([]);
  const [following, setFollowing] = useState("");
  const [followers, setFollowers] = useState("");
  const [savedposts, setSavedposts] = useState<string[]>([]);
  const [savedpostids, setSavedpostIds] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [exists, setExists] = useState<boolean>(true);
  const [followed, setFollowed] = useState<boolean | null>(null);
  const id = getCurrentUser().userData.id;
  const [loading, setLoading] = useState(0);
  const total = 2;
  let is_processing = false;

  const handleFollow = async () => {
    if (is_processing) {
      return;
    }
    is_processing = true;

    try {
      const post_data = {
        follower_id: id,
        following_id: params.userId,
        create: true
      }
      const response = await fetch("/api/follow", {
        method: "POST",
        body: JSON.stringify(post_data),
      })
      if (!response.ok) {
        throw new Error("Failed to follow user");
      }
      setFollowed(true);
      const notification_data = {
        user_id: params.userId,
        involved: id,
        content: "started following you",
      }
      const res = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification_data),
      })
      if (!res.ok) {
        throw new Error("Failed to send notification");
      }
      const result = await res.json();
      setFollowers((prev) => (parseInt(prev) + 1).toString());
    } catch (error) {
      console.log(error);
    } finally {
      is_processing = false;
    }
  };

  const handleUnFollow = async () => {
    if (is_processing) {
      return;
    }
    is_processing = true;
    try {
      const post_data = {
        follower_id: id,
        following_id: params.userId,
        create: false
      }
      const response = await fetch("/api/follow", {
        method: "POST",
        body: JSON.stringify(post_data),
      })
      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }
      setFollowed(false);
      const notification_data = {
        user_id: params.userId,
        involved: id,
        content: "has unfollowed you",
      }
      const res = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification_data),
      })
      if (!res.ok) {
        throw new Error("Failed to send notification");
      }
      setFollowers((prev) => (parseInt(prev) - 1).toString());
    } catch (error) {
      console.log(error);
    } finally {
      is_processing = false;
    }
  };

  useEffect(() => {
    if (params.userId !== "") {
      const fetchSavedPost = async (postid: string) => {
        try {
          const response = await fetch(`/api/post?post_id=${postid}`);
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          const postData = await response.json();
          return postData;
        } catch (error) {
          console.log(error);
        }
      };

      const fetchPost = async () => {
        try {
          const exist = await fetch("/api/user?authorId=" + params.userId);
          const found = await exist.json();
          if (!found.success) {
            setExists(false);
          }
          const post = await fetch(
            "/api/user?authorId=" + params.userId + "&post=true"
          );
          const data = await post.json();
          const images = data.user.posts.map((item: any) => item.image);
          const postids = data.user.posts.map((item: any) => item.id);
          const savedposts = data.user.saves.map((item: any) => item.postId);
          const name = data.user.userName;
          const src = data.user.profileImage;
          const savedPostsImages = [];
          for (const postid of savedposts) {
            const postData = await fetchSavedPost(postid);
            if (postData && postData.post && postData.post.image) {
              savedPostsImages.push(postData.post.image);
            }
          }
          setImages(images);
          setPostIds(postids);
          setSavedpostIds(savedposts);
          setSavedposts(savedPostsImages);
          setFollowing(data.user.following.length.toString());
          setFollowers(data.user.followers.length.toString());
          setUserName(name);
          setProfile(src);
        } catch (error) {
          console.log(error);
        }
      };

      if(params.userId){
        fetchPost();
        setLoading((prev) => prev + 1);
      }
    }
  }, [params.userId]);

  useEffect(() => {
    const checkFollow = async () => {
      try {
        const response = await fetch(
          `/api/follow?follower_id=${id}&following_id=${params.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to check follow");
        }
        const data = await response.json();
        if (data.follow) {
          setFollowed(true);
        }
        else {
          setFollowed(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id !== ""){
      checkFollow();
    }
  }, [id]);

  useEffect(() => {
    if (followed !== null){
      setLoading((prev) => prev + 1);
    }
  }, [followed])

  if (!exists) {
    return notFound();
  }

  if (loading < total) {
    return (
      <div className="flex min-h-screen bg-[#3c023e] flex-col">
        <div className="flex flex-col mt-[5vh]">
          <Skeleton className="w-[70vw] h-[40vh] rounded-xl ml-20" />
          <Skeleton className="w-[70vw] h-[30vh] rounded-xl mt-20 ml-20 " />
        </div>
      </div>
    )
  }

  return (
    <div className="flex ml-6 w-[75vw] justify-center">
      <div className="flex">
        <Separator orientation="vertical" className="bg-black" />
      </div>
      <div className="flex w-full flex-col items-center mt-10">
        <Avatar className="h-36 w-36 mb-4">
          <AvatarImage src={profile}></AvatarImage>
        </Avatar>
        <div className="flex justify-center text-center">
          <h1 className="text-[30px] font-bold">{userName}</h1>
          {followed ? (
            <button
              onClick={handleUnFollow}
              className="flex ml-4 jsutify-center items-center bg-white rounded-md px-5 py-2"
            >
              <CheckIcon className="mr-2" />
              Followed
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="ml-4 w-20 rounded-md bg-green-400 hover:bg-green-700 font-bold"
            >
              Follow
            </button>
          )}
        </div>
        <div className="flex mt-4 mb-4 font-semibold">
          <table className="w-[20vw]">
            <tbody>
              <tr>
                <th className="w-[36%]">{followers}</th>
                <th className="w-[28%]">{following}</th>
                <th className="w-[36%]">{images.length}</th>
              </tr>
              <tr>
                <th>Followers</th>
                <th>Following</th>
                <th>Posts</th>
              </tr>
            </tbody>
          </table>
        </div>
        <Separator className="bg-black w-[60vw]" />
        <div className="flex items-center w-full justify-center">
          <Tabs
            defaultValue="post"
            className="max-w-[70vw] mt-4 justify-center text-center"
          >
            <TabsList className="flex items-center bg-inherit text-black">
              <TabsTrigger value="post">Posts</TabsTrigger>
              <TabsTrigger value="savedpost">Saved Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="post" className="text-center flex">
              {images.length !== 0 ? (
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
              ) : (
                <div className="flex"></div>
              )}
            </TabsContent>
            <TabsContent value="savedpost" className="text-center flex">
              {savedpostids.length !== 0 ? (
                <div className="flex flex-col max-w-full justify-center">
                  {savedposts ? (
                    <div className="flex flex-wrap justify-start gap-x-8 gap-y-4">
                      {savedposts.map((image, index) => (
                        <PostCard
                          key={image}
                          image={image}
                          postid={savedpostids[index]}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <Skeleton className="w-[300px] h-[200px] rounded-lg" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center text-center w-full">
                  <h1 className="text-center">No saved posts</h1>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
