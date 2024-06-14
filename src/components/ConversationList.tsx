"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";
import { Skeleton } from "./ui/skeleton";

interface ConversationListProps {
  friendList: string[];
  conversationIds: string[][];
  id: string;
}

const ConversationList = ({ friendList, conversationIds, id }: ConversationListProps) => {
  const paras = useParams();
  const current_message_id = paras.messageId;

  return (
    <div className="flex flex-col">
      {friendList.length !== 0 ? (
        friendList.map((friend, index) =>
          index < conversationIds.length && conversationIds.length !== 0 ? (
            <ConversationBox
              key={friend}
              id={friend}
              conversationId={conversationIds[friendList.indexOf(friend)][0]}
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
        <div className="w-[23vw] justify-center items-center text-center text-[20px] font-bold">
          No friends to show
        </div>
      )}
    </div>
  );
};

export default ConversationList;
