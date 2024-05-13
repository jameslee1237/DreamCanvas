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

const CreatePostButton = () => {
    const [img, setImg] = useState<File | null>(null);
    const [encoded, setEncoded] = useState<string | null>("");
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImg(e.target.files[0]);
        }
        else{
            setImg(null);
        }
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
                            <Separator className="mt-4" />
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex w-full h-[50vh]">
                        <img src={encoded as string} alt="preview" className="object-contain" />
                    </div>
                    <div className="flex flex-col w-full justify-center items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" accept="image/*" onChange={handleChange} />
                        <button type="submit" className="py-2 px-1 rounded-md bg-green-300">Save changes</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePostButton;