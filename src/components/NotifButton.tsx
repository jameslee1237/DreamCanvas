import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { ScrollArea } from "@/components/ui/scroll-area"
import Notification from "@/components/Notification";

const NotifButton = () => {
    const temp_notif = ["ag_8761 has followed you", "you have one unread message"]

    return (
        <div className="flex">
            <Popover>
                <PopoverTrigger asChild>
                    <div className="flex w-[15vw]">
                        <button className="py-3 w-[100%] rounded-md hover:bg-slate-500">
                            <NotificationsActiveIcon className="mr-2"></NotificationsActiveIcon>
                            Notifications
                        </button>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <ScrollArea className="h-full w-full rounded-md">
                        <p className="text-[30px] font-bold ml-2">Notifications</p>
                        {temp_notif.map((notif) => (
                            <div className="flex-col w-full flex p-3 hover:bg-gray-300" key={notif}>
                                <Notification notification={notif} />
                            </div>
                        ))}
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default NotifButton;