import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { red, grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Input from "@mui/material/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Comment from "@/components/Comment";
import { Skeleton } from "@/components/ui/skeleton";
import { feedcardutil } from "@/app/actions/feedcardutil";
import Link from "next/link";

interface FeedCardProps {
  image: string;
  postid: string;
  curr_id: string;
}

const FeedCard = ({ image, postid, curr_id }: FeedCardProps) => {
  const [comments, setComments] = useState<string[] | null>(null);
  const [authorIds, setAuthorIds] = useState<string[] | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(true);

  const { val, typed, setDialogOpen, setVal, hasTyped } = feedcardutil();

  const getAuthorData = async (post_id: string) => {
    try {
      const res = await fetch(`/api/post?post_id=${post_id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await res.json();
      const p_authorId = data.post.authorId;
      setAuthorId(p_authorId);
      const _res = await fetch(
        `/api/post?post_id=${post_id}&userId=${curr_id}`
      );
      if (!_res.ok) {
        throw new Error("Failed to fetch post");
      }
      const _data = await _res.json();
      if (_data.like !== null) {
        setLiked(true);
      }
      if (_data.save !== null) {
        setSaved(true);
      }
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

  const handleValComment = async () => {
    setComments((prevComments) =>
      prevComments ? [...prevComments, val] : [val]
    );
    setAuthorIds((prevAuthorIds) =>
      prevAuthorIds ? [...prevAuthorIds, curr_id] : [curr_id]
    );
    try {
      const commentData = {
        comment: val,
        postId: postid,
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
      setVal("");
      if (authorId && authorId !== curr_id) {
        const notifData = {
          user_id: authorId,
          involved: curr_id,
          content: "commented on your post",
        };
        const res = await fetch("/api/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notifData),
        });
        if (!res.ok) {
          throw new Error("Failed to create notification");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikes = async () => {
    try {
      const likeData = {
        postId: postid,
        userId: curr_id,
        add: !liked,
      };
      setLiked((prev) => !prev);
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likeData),
      });
      if (!res.ok) {
        throw new Error("Failed to like post");
      }
      if (authorId && authorId !== curr_id) {
        const notifData = {
          user_id: authorId,
          involved: curr_id,
          content: "liked your post",
        };
        const res = await fetch("/api/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notifData),
        });
        if (!res.ok) {
          throw new Error("Failed to create notification");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaves = async () => {
    try {
      const saveData = {
        postId: postid,
        userId: curr_id,
        add: !saved,
      };
      setSaved((prev) => !prev);
      const res = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });
      if (!res.ok) {
        throw new Error("Failed to save post");
      }
      if (authorId && authorId !== curr_id) {
        const notifData = {
          user_id: authorId,
          involved: curr_id,
          content: "saved your post",
        };
        const res = await fetch("/api/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notifData),
        });
        if (!res.ok) {
          throw new Error("Failed to create notification");
        }
      }
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

  useEffect(() => {
    if (effectRan.current) return;
    const fetchData = async () => {
      const data = await getAuthorData(postid);
      const data2 = await getComments(postid);
      setUserName(data.user.userName);
      setProfileImage(data.user.profileImage);
      setComments(data2.comments.map((comment: any) => comment.comment));
      setAuthorIds(data2.comments.map((comment: any) => comment.authorId));
    };

    if (postid && curr_id) {
      fetchData();
      effectRan.current = true;
      setLoading(false);
    }
  }, [postid, curr_id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#3c023e] flex-col">
        <div className="flex flex-col mt-[5vh]">
          <Skeleton className="w-[400px] h-[300px] rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-[35vw]">
      <Card className="w-full h-full bg-[#3c023e] border-0 flex flex-col">
        <CardHeader>
          <div className="flex gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={profileImage} alt="Avatar" />
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
            {image ? (
              <Link
                href={`/feed/${postid}`}
                rel="preload"
                as={`/feed/${postid}`}
              >
                <Image
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
                />
              </Link>
            ) : (
              <div>
                <Skeleton className="w-[400px] h-[400px] rounded-md" />
              </div>
            )}
          </button>
          <div className="flex justify-between -mb-6">
            <button onClick={handleLikes}>
              {liked ? (
                <FavoriteIcon fontSize="large" sx={{ color: red[500] }} />
              ) : (
                <FavoriteBorderIcon fontSize="large" />
              )}
            </button>
            <button onClick={handleSaves}>
              {saved ? (
                <BookmarkIcon fontSize="large" sx={{ color: grey[700] }} />
              ) : (
                <BookmarkBorderIcon fontSize="large" />
              )}
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full">
            <div className="flex">
              {comments && authorIds && (
                <Comment
                  comment={comments[0]}
                  authorId={authorIds[0]}
                  NoAvatar={true}
                />
              )}
            </div>
            <div className="flex w-full">
              <Input
                fullWidth={true}
                placeholder="Add a comment"
                value={val}
                onChange={hasTyped}
                sx={{ input: { color: "white " } }}
              />
              {typed && (
                <button
                  onClick={handleValComment}
                  className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeedCard;
