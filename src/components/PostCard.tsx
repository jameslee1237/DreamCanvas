import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState, ChangeEvent } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import Comment from "./Comment";
import Input from "@mui/material/Input";
import { EllipsisVerticalIcon } from "lucide-react";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PostCardProps {
  image: string;
  postid: string;
}

const PostCard = ({ image, postid }: PostCardProps) => {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState("");
  const [comments, setComments] = useState<string[] | null>(null);
  const [authorIds, setAuthorIds] = useState<string[] | null>(null);
  const [fullval, setfullVal] = useState("");
  const [fulltyped, setfullTyped] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [portrait, setPortrait] = useState<boolean | null>(null);

  const hasTypedFull = (e: ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setfullTyped(typedValue.length > 0);
    setfullVal(typedValue);
  };

  const getAuthorId = async () => {
    try {
      const res = await fetch(`/api/post?post_id=${postid}`);
      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await res.json();
      setId(data.post.authorId);
      const res2 = await fetch(`/api/user?authorId=${data.post.authorId}&post=false`);
      const data2 = await res2.json();
      setUserName(data2.user.userName);
      setProfile(data2.user.profileImage);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDialogOpenChange = () => {
    if (dialogOpen) {
      setfullVal("");
      setfullTyped(false);
    }
    setDialogOpen((prev) => !prev);
  };

  const handlefullValComment = async () => {
    try {
      const commentData = {
        comment: fullval,
        postId: postid,
        authorId: id,
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

      setComments((prevComments) => prevComments ? [...prevComments, fullval] : [fullval]);
      setAuthorIds((prevAuthorIds) => prevAuthorIds ? [...prevAuthorIds, id] : [id]);
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
      setComments(data.comments.map((comment: any) => comment.comment));
      setAuthorIds(data.comments.map((comment: any) => comment.authorId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments(postid);
    getAuthorId();
  }, [postid]);

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

  if (comments === null || authorIds === null) {
    return (
      <div>
        <Skeleton className="w-[300px] h-[200px] rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex w-[300px] h-[200px] bg-white">
      <button onClick={() => setDialogOpen(true)} className="w-full">
        <div className="w-full h-full overflow-hidden">
          <Image
            src={image}
            alt="image"
            sizes="20vw"
            width={600}
            height={400}
            priority={true}
          />
        </div>
      </button>
      <div className="flex h-full">
        <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <div className="flex h-full">
              <div className="flex h-full bg-black items-center justify-center w-1/2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <EllipsisVerticalIcon className="absolute top-4 right-2" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute -top-[300px] -right-[1000px]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
              </div>
              <div className="flex flex-col w-1/2 max-h-full">
                <div className="flex ml-4 mt-4 mb-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={profile} alt="Avatar" />
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
                  <ScrollArea className="w-full mt-4 mb-4 max-h-[75vh] overflow-hidden">
                    {comments.map((commentf, index) => (
                      <div key={index}>
                        <Comment
                          comment={commentf}
                          authorId={authorIds[index]}
                        />
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
      </div>
    </div>
  );
};

export default PostCard;
