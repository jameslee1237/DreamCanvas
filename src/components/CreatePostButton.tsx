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

interface CreatePostButtonProps {
    userData: object;
}

const CreatePostButton = (
    props : CreatePostButtonProps
) => {
    const [img, setImg] = useState<File | null>(null);
    const [encoded, setEncoded] = useState<string | null>("");
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImg(e.target.files[0]);
        }
        else{
            setImg(null);
        }
    }

    const handlePost = () => {
        
    }

    const handleOpenChange = () => {
        if (!open) {
            setImg(null);
            setEncoded(null);
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
                    <DialogHeader>
                        <DialogTitle className="text-center py-4">
                            Create a new post
                        </DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <div className="flex flex-col items-center space-y-10">
                        <Textarea className="ring-0 focus-visible:ring-0 rounded-none border-0 w-[99%]" 
                                  placeholder="Write your own feed" />
                        {encoded ? <img src={encoded as string} alt="preview" className="object-contain max-h-[30vh]" /> 
                                 : <p>Select an image</p>}
                    </div>
                    <div className="flex flex-col w-full justify-center items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" accept="image/*" onChange={handleChange} />
                        <button type="submit" className="py-2 px-1 rounded-md bg-green-300" onClick={handlePost}>Save changes</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePostButton;