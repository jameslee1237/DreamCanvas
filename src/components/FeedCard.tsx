import Image from "next/image";
import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";

const FeedCard = () => {
    return (
        <div className="w-[35vw]">
            <Card className="w-full h-full bg-[#3c023e] border-0 flex flex-col">
                <CardHeader>
                    <div className="flex gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <h1 className="text-md text-muted-foreground mt-1">
                                o_martin_0987
                            </h1>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Image 
                        src="/test.png"
                        alt="test"
                        sizes="35vw"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                        width={2500}
                        height={1668}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default FeedCard;