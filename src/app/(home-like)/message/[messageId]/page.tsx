import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface Params {
    messageId: string;
}

export default function MessagePage({
    params } : { params: Params }
) {
    return (
        <div className="flex flex-col relative w-[57vw] overflow-hidden">
            <div className="flex w-full h-[15vh] bg-white">
                <p className="text-black">Temp Header</p>
            </div>
            <div className="flex w-full h-[70vh] bg-blue-100">
                Message of {params.messageId}
            </div>
            <div className="flex w-full h-[15vh] items-center bg-gray-400">
                <Input placeholder="Type your message here" className="w-4/5 ml-10"/>
                <Button className="ml-8">Send</Button>
            </div>
        </div>        
    )
}