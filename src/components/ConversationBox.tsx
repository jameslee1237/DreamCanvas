import React from "react";

interface ConversationBoxProps {
    conversation: string;
}

const ConversationBox = (
    props : ConversationBoxProps
) => {
    return (
        <div className="flex w-[350px] h-[40px] p-3 items-center space-x-3 hover:bg-slate-300">
            {props.conversation}
        </div>
    )
}

export default ConversationBox;