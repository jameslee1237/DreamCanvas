"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationBoxProps {
  id: string;
  conversationId?: string;
  selected: boolean;
}

const ConversationBox = ({
  id,
  conversationId,
  selected,
}: ConversationBoxProps) => {
  const [friendName, setFriendName] = useState("");
  const [friendProfile, setFriendProfile] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const router = useRouter();
  const handleClick = () => {
    router.push(`/message/${id}`);
  };

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        if (conversationId) {
          const _res = await fetch(
            `/api/conversation?convo_id=${conversationId}`
          );
          const _data = await _res.json();
          const lastMessageAt = _data.conversation.lastMessageAt;
          const lastMessage = _data.conversation.messages.find(
            (msg: any) => msg.createdAt === lastMessageAt
          );
          if (lastMessage) {
            setLastMsg(lastMessage.content);
          }
        }
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
  }, [id, conversationId]);

  return (
    <div
      className={`flex w-[350px] p-3 items-center space-x-3 hover:bg-slate-300 ${
        selected ? "bg-white" : "bg-inherit"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={friendProfile} />
        </Avatar>
        <div className="flex flex-col ml-4 mt-2">
          <h1>{friendName}</h1>
          <h2 className="text-[12px] text-gray-600">{lastMsg}</h2>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
