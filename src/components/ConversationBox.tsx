"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationBoxProps {
  id: string;
  conversationId?: string;
  selected: boolean;
}

const ConversationBox = ({ id, conversationId ,selected }: ConversationBoxProps) => {
  const [friendName, setFriendName] = useState("");
  const [friendProfile, setFriendProfile] = useState("");
  const router = useRouter();
  const handleClick = () => {
    router.push(`/message/${id}`);
  };

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await fetch(`/api/user?authorId=${id}`);
        const data = await res.json();
        setFriendName(data.user.userName);
        setFriendProfile(data.user.profileImage);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchFriend();
    }
  }, [id]);

  return (
    <div
      className={`flex w-[350px] p-3 items-center space-x-3 hover:bg-slate-300 ${
        selected ? "bg-white" : "bg-inherit"
      }`}
      onClick={handleClick}
    >
      <div className="flex">
        <Avatar>
          <AvatarImage src={friendProfile} />
        </Avatar>
        <div className="flex ml-4 mt-2">
          <h1>{friendName}</h1>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
