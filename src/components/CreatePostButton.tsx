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

const CreatePostButton = () => {
    return (
        <div className="flex">
            <Dialog>
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
                    <div className="flex flex-col w-full justify-center items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" />
                        <button type="submit" className="py-2 px-1 rounded-md bg-green-300">Save changes</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePostButton;