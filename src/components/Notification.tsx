import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface Props {
  notification: string[];
}

const Notification = ({ notification }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const notifId = notification;

  useEffect(() => {
    const sortNotif = async () => {
      if (notifId[2] !== null) {
        try {
          const response = await fetch(`/api/user?authorId=${notifId[2]}`);
          if (!response.ok) {
            throw new Error("Failed to fetch involved user");
          }
          const data = await response.json();
          setUsername(data.user.userName);
          setProfile(data.user.profileImage);
        } catch (error) {
          console.error("Failed to fetch involved user", error);
        }
      } else {
        return;
      }
    };
    if (notifId) {
      sortNotif();
    }
  }, [notifId]);

  return (
    <div className="flex w-full">
      <h1 className="text-[14px]">
        {username !== "" ? (
          <div className="flex justify-center items-center">
            <Avatar>
              <AvatarImage src={profile} />
            </Avatar>
            <div className="ml-2 flex">
              <h1 className="space-x-1">
                {username} {notifId[1]}
              </h1>
            </div>
          </div>
        ) : (
          <div>{notifId[1]}</div>
        )}
      </h1>
    </div>
  );
};

export default Notification;
