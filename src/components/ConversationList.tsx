import React from "react";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    conversations: string[];
}

const ConversationList = (
    props: ConversationListProps
) => {
    return (
        <div className="flex flex-col">
            {props.conversations.map((convo) => (
                <ConversationBox
                    conversation={convo} 
                />
            ))}
        </div>
    )
}

export default ConversationList;
