"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "@mui/material/Input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { feedcardutil } from "@/app/actions/feedcardutil";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Comment from "@/components/Comment";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";

interface Params {
  id: string;
}

export default function ImagePage({ params }: { params: Params }) {
  const imageId = params.id;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const curr_id = getCurrentUser().userData.id;
  const [image, setImage] = useState("");
  const [comments, setComments] = useState<string[] | null>(null);
  const [authorIds, setAuthorIds] = useState<string[] | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [portrait, setPortrait] = useState<boolean | null>(null);
  const { fullval, fulltyped, setfullVal, hasTypedFull } = feedcardutil();
  const effectRan = useRef(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);


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

  const handlefullValComment = async () => {
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
      setfullVal("");
      if (authorId && authorId !== curr_id) {
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
      setComments((prevComments) =>
        prevComments ? [...prevComments, fullval] : [fullval]
      );
      setAuthorIds((prevAuthorIds) =>
        prevAuthorIds ? [...prevAuthorIds, curr_id] : [curr_id]
      );
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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const handleOpenChange = () => {
    if (open) {
      setOpen((prev) => !prev);
      onDismiss();
    } else {
      setOpen((prev) => !prev);
    }
  };

  const handleClose = () => {
    setDropdownOpen(false);
  };

  const handleDropDownOpenChange = () => {
    setDropdownOpen((prev) => !prev);
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
      setOpen(true);
      fetchData();
      getImage();
      effectRan.current = true;
      setTimeout(() => {
        setLoading(false);
      }, 1000)
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="text-gray-500">See more comments</button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex h-full">
          <div className="flex h-full bg-black items-center justify-center w-1/2">
            <DropdownMenu
              open={dropdownOpen}
              onOpenChange={handleDropDownOpenChange}
            >
              <DropdownMenuTrigger asChild>
                <button>
                  <EllipsisVerticalIcon
                    onClick={() => setDropdownOpen(true)}
                    className="absolute top-4 right-2"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute -top-[300px] -right-[1000px]">
                <DropdownMenuItem onClick={copyLink}>
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleClose}>
                  Cancel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {image ? (
              <Image
                src={image}
                alt="test"
                sizes="512px"
                style={{
                  width: portrait ? "auto" : "100%",
                  height: portrait ? "100%" : "auto",
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
          <div className="flex flex-col w-1/2 max-h-full">
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
            <div className="flex w-full h-[75%] max-h-full">
              <ScrollArea className="w-full mb-4 max-h-[75vh] overflow-hidden">
                {loading ? <Skeleton className="w-[30vw] h-[65vh] rounded-xl" /> 
                : comments &&
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
      </DialogContent>
    </Dialog>
  );
}
