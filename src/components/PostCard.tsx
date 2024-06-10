import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState, ChangeEvent } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import Comment from "./Comment";
import Input from "@mui/material/Input";
import { EllipsisVerticalIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useRouter } from "next/navigation";

interface PostCardProps {
  image: string;
  postid: string;
  onDelete?: () => void;
}

const PostCard = ({ image, postid, onDelete }: PostCardProps) => {
  const id = getCurrentUser().userData.id;
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState("");
  const [comments, setComments] = useState<string[] | null>(null);
  const [authorIds, setAuthorIds] = useState<string[] | null>(null);
  const [fullval, setfullVal] = useState("");
  const [fulltyped, setfullTyped] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [portrait, setPortrait] = useState<boolean | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleting, setDeleting] = useState<boolean | null>(null);
  const router = useRouter();

  const hasTypedFull = (e: ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setfullTyped(typedValue.length > 0);
    setfullVal(typedValue);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDropdownOpen(false);
    await setTimeout(() => setDialogOpen(false), 50);
  };

  const handleClose = () => {
    setDropdownOpen(false);
  };

  const confirmDelete = async () => {
    if (
      deleting &&
      window.confirm("Are you sure you want to delete this item?")
    ) {
      setDeleting(false);
      if (onDelete) {
        onDelete();
      }
    }
  };

  const cancelDelete = () => {
    setDeleting(false);
  };

  const getAuthorId = async () => {
    try {
      const res = await fetch(`/api/post?post_id=${postid}`);
      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await res.json();
      const res2 = await fetch(
        `/api/user?authorId=${data.post.authorId}&post=false`
      );
      const data2 = await res2.json();
      setUserName(data2.user.userName);
      setProfile(data2.user.profileImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogOpenChange = () => {
    if (dialogOpen) {
      setfullVal("");
      setfullTyped(false);
      window.history.replaceState(null, '', "/user-page");
    }
    setDialogOpen((prev) => !prev);
  };

  const handleDropDownOpenChange = () => {
    setDropdownOpen((prev) => !prev);
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

      setComments((prevComments) =>
        prevComments ? [...prevComments, fullval] : [fullval]
      );
      setAuthorIds((prevAuthorIds) =>
        prevAuthorIds ? [...prevAuthorIds, id] : [id]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
        "/feed/" +
        postid
    );
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    window.history.replaceState(null, '', "/feed/" + postid);
  }

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
    if (image === "") {
      return;
    }
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      setPortrait(img.width < img.height);
    };
  }, [image]);

  useEffect(() => {
    getComments(postid);
    getAuthorId();
  }, [postid]);

  if (comments === null || authorIds === null) {
    return (
      <div>
        <Skeleton className="w-[300px] h-[200px] rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex w-[300px] h-[200px] bg-white">
      <button onClick={handleDialogOpen} className="w-full">
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
                <DropdownMenu
                  open={dropdownOpen}
                  onOpenChange={handleDropDownOpenChange}
                >
                  <DropdownMenuTrigger asChild>
                    {onDelete ? (
                      <button>
                        <EllipsisVerticalIcon
                          onClick={() => setDropdownOpen(true)}
                          className="absolute top-4 right-2"
                        />
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute -top-[300px] -right-[1000px]">
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={handleDelete}
                    >
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={copyLink}>
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleClose}>
                      Cancel
                    </DropdownMenuItem>
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
        {deleting && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg">
                Are you sure you want to delete this item?
              </h2>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={cancelDelete}
                  className="mr-2 hover:bg-gray-400 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="text-red-700 hover:bg-red-400 py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
