"use client";
import { useParams } from "next/navigation";
import React from "react";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    conversations: {
        id: string;
        conversation: string;
    }[];
}

const ConversationList = (
    props: ConversationListProps
) => {

    const paras = useParams();
    const current_message_id = paras.messageId;

    return (
        <div className="flex flex-col">
            {props.conversations.map((convo) => (
                <ConversationBox
                    key={convo.id}
                    id={convo.id}
                    conversation={convo.conversation} 
                    selected={convo.id === current_message_id}
                />
            ))}
        </div>
    )
}

export default ConversationList;
