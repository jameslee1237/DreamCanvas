"use client";
import { feedcardutil } from "@/app/actions/feedcardutil";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Comment from "@/components/Comment";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Input from "@mui/material/Input";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Params {
  id: string;
}

export default function ImagePage({ params }: { params: Params }) {
  const imageId = params.id;
  const effectRan = useRef(false);
  const [portrait, setPortrait] = useState<boolean | null>(null);
  const [image, setImage] = useState("");
  const [comments, setComments] = useState<string[] | null>(null);
  const [authorIds, setAuthorIds] = useState<string[] | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const curr_id = getCurrentUser().userData.id;
  const { fullval, fulltyped, setfullVal, hasTypedFull } = feedcardutil();

  const getImage = async () => {
    try {
      const _image_res = await fetch(`/api/post?post_id=${imageId}`);
      if (!_image_res.ok) {
        throw new Error("Failed to fetch image");
      }
      const _image_data = await _image_res.json();
      setImage(_image_data.post.image);
    } catch (error) {
      console.error(error);
    }
  };

  const getAuthorData = async (post_id: string) => {
    try {
      const res = await fetch(`/api/post?post_id=${post_id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await res.json();
      const p_authorId = data.post.authorId;
      setAuthorId(p_authorId);
      const res_user = await fetch(`/api/user?authorId=${p_authorId}`);
      if (!res_user.ok) {
        throw new Error("Failed to fetch user");
      }
      const data_user = await res_user.json();
      return data_user;
    } catch (error) {
      console.log(error);
    }
  };

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
  };

  const handlefullValComment = async () => {
    setComments((prevComments) =>
      prevComments ? [...prevComments, fullval] : [fullval]
    );
    setAuthorIds((prevAuthorIds) =>
      prevAuthorIds ? [...prevAuthorIds, curr_id] : [curr_id]
    );
    setfullVal("");
    try {
      const commentData = {
        comment: fullval,
        postId: imageId,
        authorId: curr_id,
      };
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
      if (authorId && curr_id !== authorId) {
        const notifData = {
          user_id: authorId,
          involved: curr_id,
          content: "commented on your post",
        };
        const _res = await fetch("/api/notification/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notifData),
        });
        if (!_res.ok) {
          throw new Error("Failed to create notification");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (effectRan.current) return;
    const fetchData = async () => {
      const data = await getAuthorData(imageId);
      const data2 = await getComments(imageId);
      setUserName(data.user.userName);
      setProfileImage(data.user.profileImage);
      setComments(data2.comments.map((comment: any) => comment.comment));
      setAuthorIds(data2.comments.map((comment: any) => comment.authorId));
    };
    if (imageId) {
      fetchData();
      getImage();
      effectRan.current = true;
    }
  }, [imageId]);

  useEffect(() => {
    if (image === "") {
      return;
    }
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      setPortrait(img.width < img.height);
    };
  }, [image]);

  return (
    <div className="flex">
      <div className="flex">
        <Separator orientation="vertical" className="bg-black" />
      </div>
      <div className="flex w-[80vw] justify-center items-center">
        <div className="flex w-[60vw] h-[80vh]">
          <div className="flex w-3/5 bg-black">
            {imageId ? (
              <Image
                src={image}
                alt="test"
                sizes="512px"
                style={{
                  width: portrait ? "auto" : "100%",
                  height: portrait ? "100%" : "auto",
                  objectFit: "contain",
                }}
                priority={true}
                width={2500}
                height={1668}
              />
            ) : (
              <div>
                <Skeleton className="w-[512px] h-[400px] rounded-md" />
              </div>
            )}
          </div>
          <Separator orientation="vertical" className="bg-black" />
          <div className="flex flex-col w-2/5 bg-white">
            <div className="flex ml-4 mt-4 mb-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={profileImage} alt="Avatar" />
              </Avatar>
              <div className="grid gap-1">
                <h1 className="text-[16px] ml-2 font-bold text-black text-muted-foreground mt-1">
                  {userName}
                </h1>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col w-full h-[75%] max-h-full">
              <ScrollArea className="w-full mb-4 max-h-[75vh] overflow-hidden">
                {comments &&
                  authorIds &&
                  comments.map((commentf, index) => (
                    <div key={index}>
                      <Comment comment={commentf} authorId={authorIds[index]} />
                      <Separator className="mt-4" />
                    </div>
                  ))}
              </ScrollArea>
            </div>
            <Separator />
            <div className="flex mt-4 mx-4">
              <Input
                fullWidth={true}
                value={fullval}
                placeholder="Add a comment..."
                onChange={hasTypedFull}
              />
              {fulltyped && (
                <button
                  onClick={handlefullValComment}
                  className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
