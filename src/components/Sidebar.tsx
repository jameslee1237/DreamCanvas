"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import ConversationList from "@/components/ConversationList";
import { Input } from "./ui/input";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [convList, setConvList] = useState<string[][]>([]);
  const [value, setValue] = useState("");

  const id = getCurrentUser().userData.id;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
    if (id) {
      getConvo();
    }
  }, [id]);

  return (
    <div className="flex">
      <div className="flex w-[350px] ml-6">
        <div className="flex">
          <Separator orientation="vertical" className="bg-black" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col p-3 items-center">
            <Input
              placeholder="Search"
              value={value}
              onChange={handleChange}
              className="text-[14px] w-[90%]"
            />
          </div>
          <ConversationList conversationIds={convList} id={id} />
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
