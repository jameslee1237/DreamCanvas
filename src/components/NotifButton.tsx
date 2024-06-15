"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ScrollArea } from "@/components/ui/scroll-area";
import Notification from "@/components/Notification";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useEffect, useState } from "react";

const NotifButton = () => {
  const id = getCurrentUser().userData.id;
  const [notifs, setNotifs] = useState<string[][]>([]);

  const handleNotifClick = async (notifId: string) => {
    const updateData = {
      id: notifId,
    };
    try {
      const _res = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (!_res.ok) {
        throw new Error("Failed to update notification");
      }
      const data = await _res.json();
      const notif = data.notification;
      const updatedNotifs = notifs.filter((n) => n[0] !== notif.id);
      setNotifs(updatedNotifs);
    } catch (error) {
      console.error("Failed to fetch involved user", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notification?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        if (data.notifications.length === 0) {
          return;
        } else {
          const unreadNotifications = data.notifications.filter(
            (notif: any) => !notif.read
          );
          setNotifs(
            unreadNotifications.map((notif: any) => [
              notif.id,
              notif.content,
              notif.involved,
            ])
          );
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    if (id) {
      fetchNotifications();
    }
  }, [id]);

  return (
    <div className="flex">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex w-[15vw]">
            <button className="py-3 w-[100%] rounded-md hover:bg-slate-500">
              <NotificationsActiveIcon className="mr-2" />
              Notifications
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <ScrollArea className="h-full w-full rounded-md">
            <p className="text-[30px] font-bold ml-2">Notifications</p>
            {notifs.length !== 0 ? (
              notifs.map((notif) => (
                <div
                  className="flex-col w-full flex p-3 hover:bg-gray-300"
                  key={notif[0]}
                  onClick={() => handleNotifClick(notif[0])}
                >
                  <Notification notification={notif} />
                </div>
              ))
            ) : (
              <div className="flex ml-2 items-center h-full">
                No new notifications
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotifButton;
