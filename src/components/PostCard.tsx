import Image from "next/image";
import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, ChangeEvent } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import Comment from "./Comment";
import Input from '@mui/material/Input';
import { EllipsisVerticalIcon } from "lucide-react";

interface PostCardProps {
    postid: string;
}

const PostCard = (props: PostCardProps) => {
    const [fullval, setfullVal] = useState("");
    const [fulltyped, setfullTyped] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);


    const hasTypedFull = (e: ChangeEvent<HTMLInputElement>) => {
        const typedValue = e.target.value;
        setfullTyped(typedValue.length > 0);
        setfullVal(typedValue);
    }

    const handleDialogOpenChange = () => {
        setDialogOpen((prev) => !prev);
    }

    return (
        <div className="flex w-[300px] h-[200px] bg-white">
            <button onClick={() => setDialogOpen(true)} className="w-full">
                <div className="w-full h-full overflow-hidden">
                    <Image
                        src={props.postid}
                        alt="image"
                        sizes="20vw"
                        width={300}
                        height={200}
                    />
                </div>
            </button>
            <div className="flex">
                <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
                    <DialogTrigger asChild>
                    </DialogTrigger>
                    <DialogContent>
                        <div className="flex h-full">
                            <div className="flex h-full bg-black items-center w-1/2">
                                <button>
                                    <EllipsisVerticalIcon className="absolute top-2 right-2" />
                                </button>
                                <Image
                                    src={props.postid}
                                    alt="test"
                                    sizes="512px"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    priority={true}
                                    width={2500}
                                    height={1668}
                                />
                            </div>
                            <div className="flex flex-col w-1/2 max-h-full">
                                <div className="flex ml-4 mt-4 mb-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="" alt="Avatar" />
                                        <AvatarFallback className="bg-green-200">OM</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <h1 className="text-[16px] ml-2 font-bold text-black text-muted-foreground mt-1">
                                            o_martin_0987
                                        </h1>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex w-full h-[75%] max-h-full">
                                    <ScrollArea className="w-full mt-4 mb-4 max-h-[75vh] overflow-hidden">
                                        <Comment comment={"Comment1"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment2"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment3"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment4"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment5"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment6"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment7"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment8"} />
                                        <Separator className="mt-4" />
                                        <Comment comment={"Comment9"} />
                                    </ScrollArea>
                                </div>
                                <Separator />
                                <div className="flex mt-4 mx-4">
                                    <Input fullWidth={true} value={fullval} placeholder="Add a comment..." onChange={hasTypedFull} />
                                    {fulltyped && (
                                        <button className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4">
                                            Post
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default PostCard;