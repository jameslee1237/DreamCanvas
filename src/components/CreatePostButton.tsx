"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";

interface CreatePostButtonProps {
    userId: string;
}

const bucketName = process.env.NEXT_PUBLIC_IAM_BUCKET_NAME
const region = process.env.NEXT_PUBLIC_IAM_BUCKET_REGION

const FormSchema = z.object({
    feed: z
        .string()
        .min(5, {
            message: "Feed content must be at least 5 characters.",
        })
        .max(500, {
            message: "Feed content must not be longer than 500 characters.",
        }),
})

const CreatePostButton = (
    props: CreatePostButtonProps
) => {
    const [img, setImg] = useState<File | null>(null);
    const [encoded, setEncoded] = useState<string | null>("");
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImg(e.target.files[0]);
        }
        else {
            setImg(null);
        }
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            feed: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (!img) {
                return console.error("No image found");
            }
            const formData = new FormData();
            formData.set("file", img);

            const response = await fetch("/api/s3-upload", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const result = await response.json();
            const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${result.fileName}`
            const postData = {
                feed: data.feed,
                url: imageUrl,
                authorId: props.userId,
            }

            const postResponse = await fetch("/api/post/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
            if (!postResponse.ok) {
                throw new Error("Failed to create post");
            }

            setOpen(false);
            form.reset();
            setImg(null);

        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenChange = () => {
        if (!open) {
            setImg(null);
            setEncoded(null);
            form.reset();
        }
        setOpen(!open);
    }

    useEffect(() => {
        if (img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEncoded(reader.result as string);
            }
            reader.readAsDataURL(img);
        }
        else {
            setEncoded(null);
        }
    }), [img];

    return (
        <div className="flex">
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <div className="flex w-[15vw]">
                        <button className="py-3 w-[100%] rounded-md mt-3 hover:bg-slate-500">
                            <AddCircleIcon className="mr-2 mb-1"></AddCircleIcon>
                            Create Post
                        </button>
                    </div>
                </DialogTrigger>
                <DialogContent className="h-[80vh] w-[35vw]">
                    <div className="flex flex-col items-center h-full text-center">
                        <p className="text-xl font-bold mt-4">Create Post</p>
                        <Separator className="mt-4" />
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full space-y-6">
                                <FormField
                                    control={form.control}
                                    name="feed"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea className="ml-0.5 ring-0 focus-visible:ring-0 rounded-none border-0 w-[99%] mb-6"
                                                    placeholder="Write your own feed"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col justify-center">
                                    {encoded ? <img src={encoded as string} alt="preview" className="object-contain max-h-[30vh]" />
                                    : <div>
                                        <p>Select an image</p>
                                      </div>}
                                </div>
                                <div className="flex flex-col w-full justify-center items-center gap-1.5">
                                    <Label htmlFor="picture">Picture</Label>
                                    <Input id="picture" type="file" accept="image/*" onChange={handleChange} />
                                    <Button type="submit" className="py-2 px-1 rounded-md bg-green-300">Save changes</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePostButton;