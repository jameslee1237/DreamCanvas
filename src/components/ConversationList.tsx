"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";
import { Skeleton } from "./ui/skeleton";

interface ConversationListProps {
  conversationIds: string[];
  id: string;
}

const ConversationList = ({ conversationIds, id }: ConversationListProps) => {
  const [friendList, setFriendList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
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
      //To ensure that the skeleton is shown until data is fully loaded
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#3c023e] flex-col w-[23vw]">
        <div className="flex mt-[5vh] justify-center items-center">
          <Skeleton className="w-[20vw] h-[40vh] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {friendList.length !== 0 ? (
        friendList.map((friend) =>
          conversationIds.length !== 0 ? (
            <ConversationBox
              key={friend}
              id={friend}
              conversationId={conversationIds[friendList.indexOf(friend)]}
              selected={friend === current_message_id}
            />
          ) : (
            <ConversationBox
              key={friend}
              id={friend}
              selected={friend === current_message_id}
            />
          )
        )
      ) : (
        <div className="w-[20vw] justify-center items-center text-center text-[20px] font-bold">
          No friends to show
        </div>
      )}
    </div>
  );
};

export default ConversationList;
