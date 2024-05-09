import React from "react";
import { Separator } from "@/components/ui/separator";
import ConversationList from "@/components/ConversationList";

const Sidebar = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const convo = ["temporary convo", "need work on backend"]

    return (
        <div className="flex">
            <div className="flex w-[350px] ml-6">
                <div className="flex">
                    <Separator orientation="vertical" className="bg-black" />
                </div>
                <div className="flex">
                    <ConversationList conversations={convo} />
                </div>
            </div>
            <div className="flex">
                <div className="flex">
                    <Separator orientation="vertical" className="bg-black" />
                </div>
            </div>
            <main>
                {children}
            </main>
        </div>
        
    )
}

export default Sidebar;