"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import ConversationList from "@/components/ConversationList";
import { Input } from "./ui/input";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { Skeleton } from "./ui/skeleton";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [friendList, setFriendList] = useState<string[]>([]);
  const [sortedList, setSortedList] = useState<string[]>([]);
  const [friendNames, setFriendNames] = useState<string[]>([]);
  const [convList, setConvList] = useState<string[][]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  const id = getCurrentUser().userData.id;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setValue(e.target.value);
      setSortedList(friendList);
    } else {
      setValue(e.target.value);
      const temp = friendNames.filter((name) =>
        name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const indexes = temp.map((name) => friendNames.indexOf(name));
      setSortedList(indexes.map((index) => sortedList[index]));
    }
  };

  const getConvo = async () => {
    try {
      const res = await fetch(`/api/conversation?curr_id=${id}`);
      const data = await res.json();
      if (data.conversations.length !== 0) {
        setConvList(
          data.conversations.map((convo: any) => [
            convo.id,
            convo.participants.filter((part: any) => part.userId !== id)[0]
              .userId,
          ])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await fetch(`/api/follow?curr_id=${id}`);
        const data = await res.json();
        const all_following = data.all_following;
        const all_follower = data.all_follower;
        const followMap = new Map();
        all_follower.forEach((follower: any) => {
          followMap.set(
            `${follower.followingId}-${follower.followerId}`,
            follower
          );
        });
        const FriendList = all_following.filter((following: any) =>
          followMap.has(`${following.followerId}-${following.followingId}`)
        );
        setFriendList(FriendList.map((friend: any) => friend.followerId));
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getFriends();
    }
  }, [id]);

  useEffect(() => {
    const sortListBasedOnSecondArray = (
      friendList: string[],
      conversationIds: string[][]
    ) => {
      const orderMap = new Map();
      conversationIds.forEach(([_, id], index) => {
        orderMap.set(id, index);
      });
      const sortedList = friendList.slice().sort((a, b) => {
        const aOrder = orderMap.has(a) ? orderMap.get(a) : Infinity;
        const bOrder = orderMap.has(b) ? orderMap.get(b) : Infinity;
        return aOrder - bOrder;
      });

      return sortedList;
    };

    if (friendList.length !== 0 && convList.length !== 0) {
      const sortedFriends = sortListBasedOnSecondArray(friendList, convList);
      if (JSON.stringify(sortedFriends) !== JSON.stringify(friendList)) {
        setSortedList(sortedFriends);
        setFriendList(sortedFriends);
      }
    }
  }, [friendList, convList]);

  useEffect(() => {
    if (id) {
      getConvo();
    }
  }, [id]);

  useEffect(() => {
    const getNames = async () => {
      const res = await fetch(
        `/api/user?query=${sortedList.join(",").toString()}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      setFriendNames(data.users.map((user: any) => user.userName));
    };

    if (sortedList.length !== 0) {
      getNames();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [sortedList]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Skeleton className="ml-12 w-[70vw] h-[80vh] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex w-[350px] ml-6">
        <div className="flex">
          <Separator orientation="vertical" className="bg-black" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col p-3 items-center">
            {loading ? (
              <Input disabled value={value} />
            ) : (
              <Input
                placeholder="Search"
                value={value}
                onChange={handleChange}
                className="text-[14px] w-[90%]"
              />
            )}
          </div>
          <ConversationList
            friendList={sortedList}
            conversationIds={convList}
            id={id}
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex">
          <Separator orientation="vertical" className="bg-black" />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
