import React from "react";
import { Separator } from "@/components/ui/separator";
import ConversationList from "@/components/ConversationList";

interface Params {
    messageId: string;
}

export default function MessagePage({
    params } : { params: Params }
) {
    return (
        <div>
            Message of {params.messageId}
        </div>        
    )
}