import React from "react";
import { Separator } from "@/components/ui/separator";
import ConversationList from "@/components/ConversationList";
import { Input } from "./ui/input";

const Sidebar = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const convo = [{id: "1", conversation: "Conversation 1"}, {id: "2", conversation: "Conversation 2"}]

    return (
        <div className="flex">
            <div className="flex w-[350px] ml-6">
                <div className="flex">
                    <Separator orientation="vertical" className="bg-black" />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col p-3 items-center">
                        <Input placeholder="Search" className="text-[14px] w-[90%]" />
                    </div>
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