"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  conversationIds: string[];
  id: string;
}

const ConversationList = ({ conversationIds, id }: ConversationListProps) => {
  const [friendList, setFriendList] = useState<string[]>([]);
  const paras = useParams();
  const current_message_id = paras.messageId;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await fetch(`/api/follow?curr_id=${id}`);
        const data = await res.json();
        const all_following = data.all_following;
        const all_follower = data.all_follower;
        const followMap = new Map();
        all_follower.forEach((follower: any) => {
          followMap.set(
            `${follower.followingId}-${follower.followerId}`,
            follower
          );
        });
        const FriendList = all_following.filter((following: any) =>
          followMap.has(`${following.followerId}-${following.followingId}`)
        );
        setFriendList(FriendList.map((friend: any) => friend.followerId));
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getFriends();
    }
  }, [id]);

  if (conversationIds.length === 0) {
    return (
      <div className="flex flex-col">
        {friendList.map((friend) => (
            <ConversationBox
                key={friend}
                id={friend}
                selected={friend === current_message_id}
            />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {conversationIds.map((convo) => (
        <ConversationBox
          key={convo}
          id={convo}
          selected={convo === current_message_id}
        />
      ))}
    </div>
  );
};

export default ConversationList;
